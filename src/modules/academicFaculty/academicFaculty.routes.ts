import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyValidation } from './academicFaculty.validation';
import { AcademicFacultyController } from './academicFaculty.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

//routes
router.post(
  '/create-academic-faculty',
  auth(USER_ROLE.superAdmin,USER_ROLE.admin),
  validateRequest(
    AcademicFacultyValidation.academicFacultyValidationSchema,
  ),
  AcademicFacultyController.createAcademicFacultyController,
);

router.get(
  '/get-faculties',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  AcademicFacultyController.getAllAcademicFacultiesController,
);

router.get(
  '/:facultyId',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  AcademicFacultyController.getAcademicFacultyController,
);

router.delete(
  '/:facultyId',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin
  ),
  AcademicFacultyController.deleteAcademicFacultyController,
);

router.patch(
  '/:facultyId',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin
  ),
  validateRequest(
    AcademicFacultyValidation.updateacademicFacultyValidationSchema,
  ),
  AcademicFacultyController.updateAcademicFacultyController,
);

export const AcademicFacutltiesRoutes = router;
