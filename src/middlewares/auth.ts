import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Response, Request } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import config from '../config';
import { TUSER_ROLE } from '../modules/user/user.interface';
import { UserModel } from '../modules/user/user.model';
import httpStatus from 'http-status';


const auth = (...requiredRoles: TUSER_ROLE[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    //check if token sent from the client
    if (!token) {
      throw new AppError(
        500,
        'forbidden',
        'You are not authorized to access this route',
      );
    }

    // Verify the token asynchronously
    const decoded = jwt.verify(
      token,
      config.access_token_secret as string,
    ) as JwtPayload;
    //check if the user has the required role to access the route
   
      const { role, id, iat } = decoded;

      // checking if the user is exist
      const user = await UserModel.isUserExistByCustomId(id);

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
        UserModel.isJWTIssuedBeforePasswordChanged(
          user.passwordChangedAt,
          iat as number,
        )
      ) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !');
      }

      if (requiredRoles && !requiredRoles.includes(role)) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          'You are not authorized  hi!',
        );
      }

      req.user = decoded as JwtPayload;
      next();
  });
};

export default auth;
