import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { SemesterRegistrationValidations } from "./semesterRegistration.validation";
import { SemesterRegistrationController } from "./semesterRegistration.controller";

const router=Router();

router.post('/create-semester-registration',validateRequest(SemesterRegistrationValidations.createSemesterRegistrationValidation),SemesterRegistrationController.createSemesterRegistration);

router.get('/:id',SemesterRegistrationController.getSingleSemesterRegistration)
router.patch('/:id',SemesterRegistrationController.updateSemesterRegistration)
router.get('/',SemesterRegistrationController.getAllSemesterRegistration)

export const SemesterRegistrationRoutes=router;