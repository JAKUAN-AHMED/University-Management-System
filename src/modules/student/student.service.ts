import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../errors/AppError';
import { UserModel } from '../user/user.model';
import { TStudent } from './student.interface';
import QueryBuilder from '../../builder/Querybuilder';
import { studentSearchField } from './student.constans';

const getAllStudentsFromDb = async (query: Record<string, unknown>) => {
  const studentQuery = new QueryBuilder(
    Student.find()
    .populate('user')
      .populate('admissionSemester')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      }),
    query,
  )
    .search(studentSearchField)
    .filter()
    .sort()
    .paginate()
    .fields();
  return await studentQuery.modelQuery;
};

const getStudentByIdFromDb = async (id: string) => {
  const result = Student.findById(id)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};
const DeleteStudentByIdFromDb = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    //delete student
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }

    //user _id
    const userId=deletedStudent.user;
    //delete user
    const deletedUser = await UserModel.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();
    return deletedStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('failed to delete student');
  }
};

const updateStudentByIdIntoDb = async (
  id: string,
  payload: Partial<TStudent>,
) => {
  const { name, guardian, localguardian, ...remainingStudentData } = payload;
  const modifiedUpdateData: Record<string, unknown> = {
    ...remainingStudentData,
  };
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdateData[`name.${key}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdateData[`guardian.${key}`] = value;
    }
  }
  if (localguardian && Object.keys(localguardian).length) {
    for (const [key, value] of Object.entries(localguardian)) {
      modifiedUpdateData[`localguardian.${key}`] = value;
    }
  }

  const result = await Student.findByIdAndUpdate(id, modifiedUpdateData, {
    new: true,
    runValidators: true,
  });
  return result;
};
export const StudentService = {
  getAllStudentsFromDb,
  getStudentByIdFromDb,
  DeleteStudentByIdFromDb,
  updateStudentByIdIntoDb,
};
