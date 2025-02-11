import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CourseServices } from "./course.services";
import httpStatus from "http-status";
const createCourse=catchAsync(async(req,res)=>{
    const course=await CourseServices.createCourseIntoDb(req.body);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        message:"Course created Successfully",
        success:true,
        data:course
    })
});

//get courses
const getCourses=catchAsync(async(req,res)=>{
    const courses=await CourseServices.getAllcoursesFromdDB(req.query);
    sendResponse(res, {
      statusCode:
        courses && courses.length > 0 ? httpStatus.OK : httpStatus.NOT_FOUND,
      message:
        courses && courses.length > 0
          ? 'Courses retrieved Successfully'
          : 'Courses is not found',
      success: courses ? true : false,
      data: courses ? courses : [],
    });
})

//single course
const singleCourse=catchAsync(async(req,res)=>{
    const course=await CourseServices.singleCourseFromFromdDB(req.params.id);
    sendResponse(res, {
      statusCode: course ? httpStatus.OK : httpStatus.NOT_FOUND,
      message: course ? 'Course retrieved Successfully' : 'Course is not found',
      success: course?true:false,
      data: course?course:[],
    });
})

//delete course
const deleteCourse = catchAsync(async (req, res) => {
  const course = await CourseServices.deleteCourseFromDB(req.params.id);
  sendResponse(res, {
    statusCode: course? httpStatus.OK : httpStatus.NOT_FOUND,
    message:course? 'Course deleted  Successfully' : 'Course is not found',
    success: true,
    data: course? course: [],
  });
});

//update course
const updateCourse=catchAsync(async(req,res)=>{
  const course=await CourseServices.updateCourseIntoDB(req.params.id,req.body);
  sendResponse(res,{
    statusCode:course ? httpStatus.OK : httpStatus.NOT_FOUND,
    message:course ? 'Course Updated Successfully':'Course Not Found',
    success:course ? true : false,
    data:course || []
  })
})


//assign faculties 

const assignFacultiesWithCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;

  const result = await CourseServices.assignFacultiesWithCourseIntoDB(
    courseId,
    faculties,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculties assigned  succesfully',
    data: result,
  });
});

//Remove assign course faculty
const removeFacultiesFromCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;

  const result = await CourseServices.removeFacultiesFromCourseFromDB(
    courseId,
    faculties,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculties removed  succesfully',
    data: result,
  });
});

const getFacultiesWithCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;

  const result = await CourseServices.getFacultiesWithCourseFromDB(courseId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculties retrieved succesfully',
    data: result,
  });
});
export const CourseController = {
  createCourse,
  getCourses,
  singleCourse,
  deleteCourse,
  updateCourse,
  assignFacultiesWithCourse,
  removeFacultiesFromCourse,
  getFacultiesWithCourse,
};