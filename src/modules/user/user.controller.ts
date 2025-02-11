import { UserServices } from './user.services';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import httpStatus from 'http-status';
const createStudent = catchAsync(async (req, res, next) => {
  const { password, student: studentData } = req.body;
  const result = await UserServices.createStudentFromDb(req.file,password, studentData);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Student Created Successfully',
    data: result, //result
  });
});


const createFaculty=catchAsync(async(req,res,next)=>{
  const {password,faculty:facultyData}=req.body;
  const result=await UserServices.createFacultyIntoDb(req.file,password,facultyData);
  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:'Faculty Created Successfully',
    data:result,
  });
});

const createAdmin=catchAsync(async(req,res,next)=>{
  const {password,admin:adminData}=req.body;
  const result=await UserServices.createAdminIntoDb(req.file,password,adminData);
  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:'Admin Created Successfully',
    data:result,
  });
})


//get-all-users
const getAllUsers=catchAsync(async(req,res,next)=>{
  const result=await UserServices.getAllUsersFromDb();
  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:'All Users Fetched Successfully',
    data:result,
  });
});

const getMe = catchAsync(async (req, res) => {
  const { userId, role } = req.user;

  const result = await UserServices.getMe(userId, role);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is retrieved succesfully',
    data: result,
  });
});

const changeStatus = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await UserServices.changeStatus(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Status is updated succesfully',
    data: result,
  });
});

export const userController = {
  createStudent,
  createFaculty,
  createAdmin,
  getAllUsers,
  getMe,
  changeStatus,
};
