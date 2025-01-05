import  express  from "express";
import { AcademicSemesterControllers } from "./academicSemester.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicSemesterValidationSchema } from "./academicSemester.validation";
const router=express.Router();

//routes

router.post('/create-academic-semester',validateRequest(AcademicSemesterValidationSchema.createAcademicSemesterValidationSchema),AcademicSemesterControllers.createAcamdemicSemesterController)

router.get('/get-semesters',AcademicSemesterControllers.getAllAcademicSemesterController)

router.get('/:SemesterId',AcademicSemesterControllers.getSingleSemesterController)

router.delete('/:SemesterId',AcademicSemesterControllers.deleteSingleSemesterController)

router.patch('/:SemesterId',validateRequest(AcademicSemesterValidationSchema.upateAcademicSemesterValidationSchema),AcademicSemesterControllers.updateSingleSemesterController)




export const AcademicSemesterRoutes=router;