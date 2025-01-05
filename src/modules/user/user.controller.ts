import { UserServices } from './user.services';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import httpStatus from 'http-status';
const createStudent = catchAsync(async (req, res, next) => {
  const { password, student: studentData } = req.body;
  const result = await UserServices.createStudentFromDb(password, studentData);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Student Created Successfully',
    data: result,
  });
});


const createFaculty=catchAsync(async(req,res,next)=>{
  const {password,faculty:facultyData}=req.body;
  const result=await UserServices.createFacultyIntoDb(password,facultyData);
  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:'Faculty Created Successfully',
    data:result,
  });
});

const createAdmin=catchAsync(async(req,res,next)=>{
  const {password,admin:adminData}=req.body;
  const result=await UserServices.createAdminIntoDb(password,adminData);
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
export const userController = {
  createStudent,
  createFaculty,
  createAdmin,
  getAllUsers,
};
