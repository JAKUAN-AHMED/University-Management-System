import mongoose from 'mongoose';
import QueryBuilder from '../../builder/Querybuilder';
import AppError from '../../errors/AppError';
import { CourseSearchableFields } from './course.constant';
import { ICourse, ICoursefaculty } from './course.interface';
import {CourseFacultyModel, CourseModel } from './course.model';

const createCourseIntoDb = async (payload: ICourse) => {
  const course = await CourseModel.create(payload);
  return course;
};

//get all course
const getAllcoursesFromdDB = async (query: Record<string, unknown>) => {
  const courses = new QueryBuilder(
    CourseModel.find().populate('preRequisiteCourses.course'),
    query,
  )
    .search(CourseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await courses.modelQuery;
  const meta = await courses.countTotal();
  return {
    result,
    meta,
  };
};

//get single course
const singleCourseFromFromdDB = async (id: string) => {
  const course = await CourseModel.findById(id).populate(
    'preRequisiteCourses.course',
  );
  return course;
};

//delete course
const deleteCourseFromDB = async (id: string) => {
  const course = await CourseModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true, runValidators: true },
  );
  return course;
};

//update course
const updateCourseIntoDB = async (id: string, payload: Partial<ICourse>) => {
  const { preRequisiteCourses, ...remainingCourseData } = payload;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // Step 1: Update the basic course info
    const updateBasicCourseInfo = await CourseModel.findByIdAndUpdate(
      id,
      remainingCourseData,
      { new: true, runValidators: true, session },
    );

    if (!updateBasicCourseInfo) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course!');
    }

    // Step 2: Handle preRequisiteCourses if provided
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      // Filter deleted preRequisites
      const deletedPreRequisites = preRequisiteCourses
        .filter((el) => el.course && el.isDeleted)
        .map((el) => el.course);

      // Remove deleted preRequisites
      const deletedResult = await CourseModel.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: { course: { $in: deletedPreRequisites } },
          },
        },
        { new: true, runValidators: true, session },
      );

      if (!deletedResult) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'Failed to remove deleted prerequisites!',
        );
      }

      // Filter new preRequisites
      const newPreRequisites = preRequisiteCourses.filter(
        (el) => el.course && !el.isDeleted,
      );

      // Add new preRequisites
      const addedResult = await CourseModel.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourses: { $each: newPreRequisites } },
        },
        { new: true, runValidators: true, session },
      );

      if (!addedResult) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'Failed to add new prerequisites!',
        );
      }
    }

    await session.commitTransaction();
    await session.endSession();

    // Step 3: Fetch and return the final updated course
    const updatedCourse = await CourseModel.findById(id).populate(
      'preRequisiteCourses.course',
    );

    if (!updatedCourse) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to fetch updated course!',
      );
    }

    return updatedCourse; // Return the fully updated course object
  } catch (err) {
     await session.abortTransaction();
     await session.endSession();
     throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
  }
};


//assing faculties
const assignFacultiesWithCourseIntoDB = async (
  id: string,
  payload: Partial<ICoursefaculty>,
) => {
  const result = await CourseFacultyModel.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: { faculties: { $each: payload } },
    },
    {
      upsert: true,
      new: true,
    },
  );
  return result;
};


const getFacultiesWithCourseFromDB = async (courseId: string) => {
  const result = await CourseFacultyModel.findOne({ course: courseId }).populate(
    'faculties',
  );
  return result;
};

//remove course faculties
const removeFacultiesFromCourseFromDB = async (
  id: string,
  payload: Partial<ICoursefaculty>,
) => {
  const result = await CourseFacultyModel.findByIdAndUpdate(
    id,
    {
      $pull: { faculties: { $in: payload } },
    },
    {
      new: true,
    },
  );
  return result;
};

export const CourseServices = {
  createCourseIntoDb,
  getAllcoursesFromdDB,
  singleCourseFromFromdDB,
  deleteCourseFromDB,
  updateCourseIntoDB,
  assignFacultiesWithCourseIntoDB,
  removeFacultiesFromCourseFromDB,
  getFacultiesWithCourseFromDB,
};
