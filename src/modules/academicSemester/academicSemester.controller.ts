import { IacademicSemester } from './academicSemester.interface';
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicSemesterServices } from "./academicSemester.services";

const createAcamdemicSemesterController = catchAsync(async (req, res, next) => {
  const payload = req.body;
  const result = await AcademicSemesterServices.createAcademicSemesterDb( payload);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Semester Created Successfully',
    data: result,
  });
});


//getall academic semester controller
const getAllAcademicSemesterController = catchAsync(async (req, res, next) => {
  const result = await AcademicSemesterServices.getAllAcademicSemestersDb();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: result && result.length>0 ?`Academic Semester all data got Successfully`: `There is no Data available`,
    data: result && result.length>0 ? result : [],
  });
});
//get single semester
const getSingleSemesterController=catchAsync(async(req,res,next)=>{
  const result=await AcademicSemesterServices.getAcademicSemesterByIdDb(req.params.SemesterId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: result ? `Academic Semester  data got Successfully `: `semester Not Found`,
    data: result || {},
  });
})

//delete semester
const deleteSingleSemesterController=catchAsync(async(req,res,next)=>{
  const result=await AcademicSemesterServices.deleteAcademicSemesterByIdDb(req.params.SemesterId);
  sendResponse(res, {
    statusCode: 200,
    message: result ?`Successfully Deleted ${req.params.SemesterId}` : `Its Already Deleted before requested`,
    success: true,
    data: {},
  });
})

//update semester
const updateSingleSemesterController=catchAsync(async(req,res,next)=>{
  const result=await AcademicSemesterServices.updateAcademicSemesterFromDb(req.params.SemesterId,req.body);
  sendResponse(res,{
    statusCode:result? 200 :404,
    message:result? 'Updated semester Data' : 'Not found',
    success:true,
    data:result || {}
  })
})
export const AcademicSemesterControllers = {
  createAcamdemicSemesterController,
  getAllAcademicSemesterController,
  getSingleSemesterController,
  deleteSingleSemesterController,
  updateSingleSemesterController,
};
