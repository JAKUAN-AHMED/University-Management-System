import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { facultyController } from "./faculty.controller";
import { updateFacultyValidationSchema } from "./faculty.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router=Router();
router.get('/:id',facultyController.getSingleFaculty);
router.put('/:id',validateRequest(updateFacultyValidationSchema),facultyController.updateFaculty);
router.delete('/:id',facultyController.deletefaculty);
router.get('/',auth(USER_ROLE.admin,USER_ROLE.faculty),facultyController.getAllFaculty);
export const facultyRouter=router;