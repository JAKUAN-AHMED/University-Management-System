import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { SemesterRegistrationValidations } from "./semesterRegistration.validation";
import { SemesterRegistrationController } from "./semesterRegistration.controller";
import { USER_ROLE } from "../user/user.constant";
import auth from "../../middlewares/auth";

const router=Router();

router.post('/create-semester-registration',auth(USER_ROLE.admin,USER_ROLE.superAdmin),validateRequest(SemesterRegistrationValidations.createSemesterRegistrationValidation),SemesterRegistrationController.createSemesterRegistration);

router.get('/:id',auth('admin','superAdmin','faculty','student'),SemesterRegistrationController.getSingleSemesterRegistration)

router.patch('/:id',auth('admin','superAdmin'),SemesterRegistrationController.updateSemesterRegistration)
router.get(
  '/',
  auth('admin', 'superAdmin', 'faculty', 'student'),
  SemesterRegistrationController.getAllSemesterRegistration,
);

router.delete(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  SemesterRegistrationController.deleteSemesterRegistration,
);

export const SemesterRegistrationRoutes=router;