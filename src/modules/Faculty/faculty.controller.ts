import { FacultyModel } from './faculty.model';
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { facultyServices } from './faculty.services';


const getAllFaculty=catchAsync(async (req, res) => {
    console.log(req.cookies);
    const faculty=await facultyServices.getAllfacultiesFromDb(req.query);
    sendResponse(res,{
        statusCode:200,
        success:true,
        message:"Faculty fetched successfully",
        data:faculty
    })
});

const getSingleFaculty=catchAsync(async (req, res) => {
    const faculty=await facultyServices.getSingleFacultyFromDb(req.params.id);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Faculty fetched successfully",
        data:faculty
    })
});


const updateFaculty=catchAsync(async (req, res) => { 
    const faculty=await facultyServices.updateFacultyInDb(req.params.id,req.body.faculty);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Faculty updated successfully",
        data:faculty
    })
});

const deletefaculty=catchAsync(async (req, res)=>{
    const faculty=await facultyServices.deleteFacultyFromDb(req.params.id);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Faculty deleted successfully",
        data:faculty
    })
});
export const facultyController={
    getAllFaculty,
    getSingleFaculty,
    updateFaculty,
    deletefaculty
}