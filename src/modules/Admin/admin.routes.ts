import { Router } from "express";
import { adminController } from "./admin.controller";

const router=Router();


router.get('/:id',adminController.getSingleAdmin);

router.delete('/:id',adminController.deleteAdmin);

router.patch('/:id',adminController.updateAdmin);

router.get('/',adminController.getAllAdmin);




export const AdminRoutes=router;