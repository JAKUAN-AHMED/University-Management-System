import { z } from "zod";
import { bloodGroup, Gender } from "./faculty.constant";

export const createUserNameValidationSchema = z.object({
    firstName: z.string().min(1).max(20).refine((data) => /^[A-Z]/.test(data), { message: 'First name should start with capital letter' }),
    middleName: z.string(),
    lastName: z.string(),
});



export const CreatefacultyValidationSchema = z.object({
    body: z.object({
        password: z.string().max(20).optional(),
        faculty: z.object({
            designation: z.string(),
            name: createUserNameValidationSchema,
            gender: z.enum([...Gender] as [string, ...string[]]),
            dateOfBirth: z.string().optional(),
            email: z.string().email(),
            contactNo: z.string(),
            emergencyContactNo: z.string(),
            bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
            presentAddress: z.string(),
            permanentAddress: z.string(),
            academicDepartment: z.string(),
            academicFaculty: z.string(),
            profileImage: z.string().optional(),
        }),
    })
});

export const updateFacultyValidationSchema = z.object({
    body: CreatefacultyValidationSchema.shape.body.partial()
});

export const facultyValidationSchema={
    CreatefacultyValidationSchema,
    updateFacultyValidationSchema
}