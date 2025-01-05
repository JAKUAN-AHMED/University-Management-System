import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyValidation } from './academicFaculty.validation';
import { AcademicFacultyController } from './academicFaculty.controller';

const router = express.Router();

//routes
router.post(
  '/create-academic-faculty',
  validateRequest(
    AcademicFacultyValidation.academicFacultyValidationSchema,
  ),
  AcademicFacultyController.createAcademicFacultyController,
);

router.get(
  '/get-faculties',
    AcademicFacultyController.getAllAcademicFacultiesController,
);

router.get(
  '/:facultyId',
  AcademicFacultyController.getAcademicFacultyController,
);

router.delete(
  '/:facultyId',
  AcademicFacultyController.deleteAcademicFacultyController,
);

router.patch(
  '/:facultyId',
  validateRequest(
    AcademicFacultyValidation.updateacademicFacultyValidationSchema,
  ),
  AcademicFacultyController.updateAcademicFacultyController,
);

export const AcademicFacutltiesRoutes = router;
