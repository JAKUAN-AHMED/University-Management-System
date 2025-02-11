import { z } from "zod";
import { createUserNameValidationSchema } from "../Faculty/faculty.validation";
import { bloodGroup, Gender } from "../Faculty/faculty.constant";

export const createAdminValidationSchema = z.object({
    body:z.object({
        password: z.string().max(20).optional(),
        admin: z.object({
           designation: z.string(),
           name: 
            createUserNameValidationSchema
         ,
           gender:z.enum([...Gender] as [string, ...string[]]),
        dateOfBirth: z.string(),
        email: z.string().email(),
        contactNo: z.string(),
        emergencyContactNo: z.string(),
        bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
        presentAddress: z.string(),
        permanentAddress: z.string(),
        profileImg: z.string().optional(),
        }),
    }),
});

export const updateAdminValidationSchema = z.object({
    body: createAdminValidationSchema.shape.body.partial(),
});

export const adminValidationSchema={
    createAdminValidationSchema,
    updateAdminValidationSchema
};