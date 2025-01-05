import { CreatefacultyValidationSchema } from './../Faculty/faculty.validation';
import { userController } from './user.controller';
import { studentValidationSchemas } from '../student/student.validation';
import validateRequest from '../../middlewares/validateRequest';
import express from 'express';
import { createAdminValidationSchema } from '../Admin/admin.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';
const router=express.Router();

//create student
router.post('/create-student',auth(USER_ROLE.admin),validateRequest(studentValidationSchemas.CreatestudentValidationSchema),userController.createStudent);


//create-faculty
router.post('/create-faculty',
    // auth(USER_ROLE.admin),
    validateRequest(CreatefacultyValidationSchema),userController.createFaculty);


//create-admin
router.post('/create-admin',
    auth(USER_ROLE.admin),
    validateRequest(createAdminValidationSchema),userController.createAdmin);


//get-all-users
router.get('/',userController.getAllUsers);

export const UserRoutes=router;