import { CreatefacultyValidationSchema } from './../Faculty/faculty.validation';
import { userController } from './user.controller';
import { studentValidationSchemas } from '../student/student.validation';
import validateRequest from '../../middlewares/validateRequest';
import express, { NextFunction, Request,Response } from 'express';
import { createAdminValidationSchema } from '../Admin/admin.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';
import { UserValidationSchema } from './user.validation';
import { upload } from '../../utils/sendImageToCloudinary';
const router=express.Router();

//create student
router.post('/create-student',auth(USER_ROLE.admin,USER_ROLE.superAdmin),
upload.single('file'),
(req:Request,res:Response,next:NextFunction)=>{
    req.body=JSON.parse(req.body.data);
    next();
},
validateRequest(studentValidationSchemas.CreatestudentValidationSchema),
userController.createStudent);


//create-faculty
router.post(
  '/create-faculty',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(CreatefacultyValidationSchema),
  userController.createFaculty,
);


//create-admin
router.post(
  '/create-admin',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(createAdminValidationSchema),
  userController.createAdmin,
);


//get-all-users
router.get('/',userController.getAllUsers);


//change status to a  user
router.post(
  '/change-status/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(UserValidationSchema.changeStatusValidationSchema),
  userController.changeStatus,
);

//me route
router.get('/me',auth('student','admin','faculty','superAdmin'),userController.getMe);

export const UserRoutes=router;