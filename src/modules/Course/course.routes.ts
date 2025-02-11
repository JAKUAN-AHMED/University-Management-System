import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { CourseValidations } from "./course.validation";
import { CourseController } from "./course.controller";
import { USER_ROLE } from "../user/user.constant";
import auth from "../../middlewares/auth";


const router=Router();



router.post('/create-course',auth('admin','superAdmin'),validateRequest(CourseValidations.createCourseValidationSchema),CourseController.createCourse);

router.get(
  '/:id',
  auth('admin', 'superAdmin', 'student', 'faculty'),
  CourseController.singleCourse,
);
router.delete(
  '/:id',
  auth('admin', 'superAdmin'),
  CourseController.deleteCourse,
);
router.patch(
  '/:id',
  auth('admin', 'superAdmin'),
  validateRequest(CourseValidations.updateCourseValidationSchema),
  CourseController.updateCourse,
);
router.put(
  '/:courseId/assign-faculties',
  auth('admin', 'superAdmin'),
  validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
  CourseController.assignFacultiesWithCourse,
);

router.get(
  '/:courseId/get-faculties',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  CourseController.getFacultiesWithCourse,
);

router.delete(
  '/:courseId/remove-faculties',
  auth('admin', 'superAdmin'),
  validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
  CourseController.removeFacultiesFromCourse,
);
router.get('/', auth('admin', 'superAdmin','student','faculty'), CourseController.getCourses);




export const CourseRoutes=router;