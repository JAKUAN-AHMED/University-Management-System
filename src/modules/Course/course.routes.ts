import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { CourseValidations } from "./course.validation";
import { CourseController } from "./course.controller";


const router=Router();



router.post('/create-course',validateRequest(CourseValidations.createCourseValidationSchema),CourseController.createCourse);

router.get('/:id',CourseController.singleCourse);
router.delete('/:id',CourseController.deleteCourse);
router.patch('/:id',validateRequest(CourseValidations.updateCourseValidationSchema),CourseController.updateCourse);
router.put(
  '/:courseId/assign-faculties',
  validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
  CourseController.assignFacultiesWithCourse,
);
router.delete(
  '/:courseId/remove-faculties',
  validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
  CourseController.removeFacultiesFromCourse,
);
router.get('/',CourseController.getCourses);




export const CourseRoutes=router;