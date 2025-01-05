import { z } from "zod";

const academicFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error:'Academic Faculty must be a string',
      required_error:'Name is required'
    }),
  }),
});

const updateacademicFacultyValidationSchema = z.object({
  body: academicFacultyValidationSchema.shape.body.partial(),
});
export const AcademicFacultyValidation = {
  academicFacultyValidationSchema,
  updateacademicFacultyValidationSchema,
};