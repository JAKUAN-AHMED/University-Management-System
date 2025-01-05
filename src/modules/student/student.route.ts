import express from 'express';
import { StudentController } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidationSchemas } from './student.validation';

const router = express.Router();

// Route to create a student

// Route to get all students
router.get('/data', StudentController.getAllStudents);

// Route to get a student by ID (fix param name to match handler)
router.get('/:id', StudentController.getStudentById);
router.patch('/:id',validateRequest(studentValidationSchemas.UpdateStudentValidationSchema), StudentController.UpdateStudentById);
router.delete('/:id', StudentController.DeleteStudentById);

export const studentRoutes = router;
