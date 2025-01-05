import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { adminServices } from "./admin.services";

const getAllAdmin=catchAsync(async (req,res) => {
    const admin=await adminServices.getAllAdminFromDB(req.query);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        message:"All Admins retrieved successfully",
        success:true,
        data:admin
    })
});

const getSingleAdmin=catchAsync(async (req,res) => {   
    const admin=await adminServices.getAdminByIdFromDB(req.params.id);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        message:"Admin retrieved successfully",
        success:true,
        data:admin
    })
 });


 const deleteAdmin=catchAsync(async (req,res) => {
    const admin=await adminServices.deleteAdminByIdFromDB(req.params.id);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        message:"Admin Deleted successfully",
        success:true,
        data:admin
    })
 })

    const updateAdmin=catchAsync(async (req,res) => {
        const admin=await adminServices.updateAdminByIdInDB(req.params.id,req.body.admin);
        sendResponse(res,{
            statusCode:httpStatus.OK,
            message:"Admin Updated successfully",
            success:true,
            data:admin
        })
    })

    export const adminController={
        getAllAdmin,
        getSingleAdmin,
        deleteAdmin,
        updateAdmin
    }