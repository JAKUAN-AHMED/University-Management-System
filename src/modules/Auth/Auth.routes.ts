import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidation } from "./Auth.validation";
import { AuthController } from "./Auth.controller";
import { USER_ROLE } from "../user/user.constant";
import auth from "../../middlewares/auth";

const router=Router();

router.post('/login',validateRequest(AuthValidation.loginValidationSchema),AuthController.login);

router.post('/change-password',auth(USER_ROLE.admin,USER_ROLE.faculty,USER_ROLE.student),validateRequest(AuthValidation.ChangePassValidationSchema),AuthController.changePassword);

router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenValidationSchema),
  AuthController.refreshToken,
);
export const AuthRoutes=router;