import  express  from "express";
import { AcademicSemesterControllers } from "./academicSemester.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicSemesterValidationSchema } from "./academicSemester.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
const router=express.Router();

//routes

router.post(
  '/create-academic-semester',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin
  ),
  validateRequest(
    AcademicSemesterValidationSchema.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.createAcamdemicSemesterController,
);

router.get(
  '/get-semesters',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  AcademicSemesterControllers.getAllAcademicSemesterController,
);

router.get(
  '/:SemesterId',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  AcademicSemesterControllers.getSingleSemesterController,
);

router.delete(
  '/:SemesterId',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin
  ),
  AcademicSemesterControllers.deleteSingleSemesterController,
);

router.patch(
  '/:SemesterId',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin
  ),
  validateRequest(
    AcademicSemesterValidationSchema.upateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.updateSingleSemesterController,
);




export const AcademicSemesterRoutes=router;