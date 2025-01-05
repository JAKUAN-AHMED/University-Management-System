import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
import { AcademicDepartmentController } from './academicDepartment.controller';

const router = express.Router();

//routes
router.post(
  '/create-academic-department',
  // validateRequest(AcademicDepartmentValidation.academicDepartmentValidationSchema),
  AcademicDepartmentController.createAcademicDepartmentController,
);

router.get(
  '/get-departments',
  AcademicDepartmentController.getAllAcademicDepartmentsController,
);

router.get(
  '/:departmentId',
  AcademicDepartmentController.getAcademicDepartmentController,
);

router.delete(
  '/:departmentId',
  AcademicDepartmentController.deleteAcademicDepartmentController,
);

router.patch(
  '/:departmentId',
  validateRequest(
    AcademicDepartmentValidation.updateacademicDepartmentValidationSchema,
  ),
  AcademicDepartmentController.updateAcademicDepartmentController,
);

export const AcademicDepartmentsRoutes = router;
