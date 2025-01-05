import { access } from 'fs';
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { AuthSercices } from "./Auth.services";
import config from '../../config';
import { ref } from 'joi';
const login=catchAsync(async (req,res)=>{
    const result=await AuthSercices.login(req.body);
    const {refreshToken,accesToken,needsPasswordChange}=result;

    //set cookie

    res.cookie("refreshToken",refreshToken,{
        secure:config.NODE_ENV==="production",  
        httpOnly:true,
    });
    sendResponse(res,{
        statusCode:httpStatus.OK,
        message:"User logged in successfully",
        success:true,
        data:{
            accesToken,
            needsPasswordChange
        }
    })
});

//Change password
const changePassword=catchAsync(async (req,res)=>{
    const {...passwordData}=req.body;

    const result=await AuthSercices.changePasswordIntoDB(req.user,passwordData);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        message:"Password changed successfully",
        success:true,
        data:result
    })
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthSercices.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access token is retrieved succesfully!',
    data: result,
  });
});
export const AuthController = {
  login,
  changePassword,
  refreshToken,
};