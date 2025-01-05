import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicFacultServices } from "./academicFaculty.services";

const createAcademicFacultyController=catchAsync(async(req,res,next)=>{
    const payload=req.body;
    const result=await AcademicFacultServices.createAcademicFacultyIntoDb(payload);
     sendResponse(res, {
       statusCode: 200,
       success: true,
       message: 'Academic Facultyt Created Successfully',
       data: result,
     });

})

const getAllAcademicFacultiesController=catchAsync(async(req,res,next)=>{
    const result=await AcademicFacultServices.getAllAcademicFacultiesFromDb();
     sendResponse(res, {
       statusCode: 200,
       success: true,
       message:
         result && result.length > 0
           ? `Academic Faculties  data got Successfully`
           : `There is no Data available`,
       data: result && result.length > 0 ? result : [],
     });
})

const getAcademicFacultyController=catchAsync(async(req,res,next)=>{
    const result=await AcademicFacultServices.getAcademicFacultyByIdFromDb(req.params.facultyId);
     sendResponse(res, {
       statusCode: 200,
       success: true,
       message: result
         ? `Academic Faculty  data got Successfully `
         : `Faculty Not Found`,
       data: result || {},
     });
})

const updateAcademicFacultyController=catchAsync(async(req,res,next)=>{
    const result = await AcademicFacultServices.updateAcademicFacultyByIdIntoDb(
      req.body,
      req.params.facultyId,
    );
     sendResponse(res, {
       statusCode: 200,
       success: true,
       message: result ? 'Updated Faculty Data' : 'Not found',
       data: result || {},
     });
})

const deleteAcademicFacultyController=catchAsync(async(req,res,next)=>{
    const result=await AcademicFacultServices.deleteAcademicFacultyByIdFromDb(req.params.facultyId);
     sendResponse(res, {
       statusCode: 200,
       success: true,
       message: result
         ? `Successfully Deleted ${req.params.facultyId}`
         : `Its Already Deleted before requested`,
       data: {},
     });
})

export const AcademicFacultyController={
    createAcademicFacultyController,
    getAllAcademicFacultiesController,
    getAcademicFacultyController,
    updateAcademicFacultyController,
    deleteAcademicFacultyController
}