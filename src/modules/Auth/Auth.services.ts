import AppError from '../../errors/AppError';
import { UserModel } from '../user/user.model';
import { ILoginUser } from './Auth.interface';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../../config';
import { createToken } from './Auth.utils';
import { sendEmail } from '../../utils/sendEmail';

const login = async (payload: ILoginUser) => {
  //   check if user exist
  const user = await UserModel.isUserExistByCustomId(payload.id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (await UserModel.isDeletedUser(payload.id)) {
    throw new AppError(httpStatus.NOT_FOUND, 'user not found,might be deleted');
  }

  //check user is blocked
  if (await UserModel.UserStatus(payload.id)) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is blocked');
  }

  // check if password match
  const storedHashedPassword = user.password;
  if (
    !(await UserModel.isPasswordMatch(payload.password, storedHashedPassword))
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid password');
  }

  // access granted:send accestoken,refreshtoken

  const JwtPayload = {
    userId: user.id,
    role: user.role,
  };
  //create toke and send to the client
  const accesToken = createToken(
    JwtPayload,
    config.access_token_secret as string,
    config.access_token_expires as string,
  );
  //refresh token
  const refreshToken = createToken(
    JwtPayload,
    config.access_token_secret as string,
    config.refresh_token_expires as string,
  );

  return { accesToken,refreshToken, needsPasswordChange: user.needsPasswordChange };
};

//change pass
const changePasswordIntoDB = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  // checking if the user is exist
  const user = await UserModel.isUserExistByCustomId(userData.id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  // checking if the user is already deleted

  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  // checking if the user is blocked

  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  }

  //checking if the password is correct

  if (!(await UserModel.isPasswordMatch(payload.oldPassword, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.brcypt_salt_rounds),
  );

  await UserModel.findOneAndUpdate(
    {
      id: userData.id,
      role: userData.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  );
  return null;
};


//REFRESH TOKEN
const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = jwt.verify(
    token,
    config.refresh_token_secret as string,
  ) as JwtPayload;

  const { userId, iat } = decoded;

  // checking if the user is exist
  const user = await UserModel.isUserExistByCustomId(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  // checking if the user is already deleted
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  // checking if the user is blocked
  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  }

  if (
    user.passwordChangedAt &&
    UserModel.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !');
  }

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.access_token_secret as string,
    config.refresh_token_expires as string,
  );

  return {
    accessToken,
  };
};


const forgetPassword = async (userId: string) => {
  // checking if the user is exist
  const user = await UserModel.isUserExistByCustomId(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  // checking if the user is already deleted
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  // checking if the user is blocked
  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  }
  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const resetToken = createToken(
    jwtPayload,
    config.access_token_secret as string,
    '10m',
  );
  const resetUIlink = `${config.reset_pass_ui_link}?id=${user.id}&token=${resetToken}`;
  sendEmail(user.email,resetUIlink);
  
};


const resetPassword = async (payload:{
  id:string,
  newPassword:string
},token: string) => {
  // checking if the user is exist
  const user = await UserModel.isUserExistByCustomId(payload.id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  // checking if the user is already deleted
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  // checking if the user is blocked
  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  }

  const decoded = jwt.verify(
    token,
    config.access_token_secret as string,
  ) as JwtPayload;

  if (decoded.userId !== payload.id) {
    throw new AppError(httpStatus.FORBIDDEN, 'You are forbidden !');
  }
  
  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.brcypt_salt_rounds),
  );

  await UserModel.findOneAndUpdate(
    {
      id: decoded.userId,
      role: decoded.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  );
};

export const AuthSercices = { login, changePasswordIntoDB ,refreshToken,forgetPassword,resetPassword};
