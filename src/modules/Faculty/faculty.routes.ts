import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { facultyController } from "./faculty.controller";
import { updateFacultyValidationSchema } from "./faculty.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router=Router();
router.get(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
  facultyController.getSingleFaculty,
);
router.put(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(updateFacultyValidationSchema),
  facultyController.updateFaculty,
);
router.delete(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  facultyController.deletefaculty,
);
router.get(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
  facultyController.getAllFaculty,
);
export const facultyRouter=router;