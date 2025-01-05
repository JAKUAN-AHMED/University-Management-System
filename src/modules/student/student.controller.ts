
import { StudentService } from './student.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
//async
import httpStatus from 'http-status';
const getAllStudents = catchAsync(async (req, res, next) => {
  
  const result = await StudentService.getAllStudentsFromDb(req.query);
   sendResponse(res, {
     statusCode: httpStatus.OK,
     success: true,
     message: 'Successfully retrived students data',
     data: result,
   });
});

const getStudentById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await StudentService.getStudentByIdFromDb(id);
  sendResponse(res,{
    statusCode: httpStatus.OK,
    success:true,
    message:'Successfully got data by Id',
    data:result,
  })
});

const UpdateStudentById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await StudentService.updateStudentByIdIntoDb(id,req.body.student);
   sendResponse(res, {
     statusCode: httpStatus.OK,
     success: true,
     message: 'Successfully update data by Id',
     data: result,
   });
});
const DeleteStudentById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await StudentService.DeleteStudentByIdFromDb(id);
   sendResponse(res, {
     statusCode: httpStatus.OK,
     success: true,
     message: 'Successfully delete data by Id',
     data: result,
   });
});

export const StudentController = {
  getAllStudents,
  getStudentById,
  UpdateStudentById,
  DeleteStudentById,
};
