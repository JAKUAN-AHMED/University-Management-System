import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { AuthSercices } from "./Auth.services";
import config from '../../config';
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


const forgetPassword=catchAsync(async (req,res)=>{
    const userId=req.body.id;
    const result=await AuthSercices.forgetPassword(userId);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Reset link is generated successfully",
        data:result
    })
});
const resetPassword=catchAsync(async (req,res)=>{
    
    const token=req.headers.authorization;
    const result=await AuthSercices.resetPassword(req.body,token as string);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Password reset Successfully",
        data:result
    })
});
export const AuthController = {
  login,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
};