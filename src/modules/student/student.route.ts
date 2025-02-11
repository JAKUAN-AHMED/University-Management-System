import express from 'express';
import { StudentController } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidationSchemas } from './student.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

// Route to create a student

// Route to get all students
router.get('/data',auth('admin','superAdmin'), StudentController.getAllStudents);

// Route to get a student by ID (fix param name to match handler)
router.get('/:id',auth('student','faculty','admin','superAdmin'), StudentController.getStudentById);
router.patch(
  '/:id',
  auth('admin', 'superAdmin'),
  validateRequest(studentValidationSchemas.UpdateStudentValidationSchema),
  StudentController.UpdateStudentById,
);
router.delete(
  '/:id',
  auth('admin', 'superAdmin'),
  StudentController.DeleteStudentById,
);

export const studentRoutes = router;
