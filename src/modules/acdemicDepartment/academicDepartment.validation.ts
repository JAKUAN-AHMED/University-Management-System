import { z } from 'zod';

const academicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic Department must be a string',
      required_error: 'Name is required',
    }),
    academicFaculty: z.string({
      invalid_type_error: 'Academic Faculty must be a string',
      required_error: 'Faculty is required',
    }),
  }),
});

const updateacademicDepartmentValidationSchema = z.object({
  body: academicDepartmentValidationSchema.shape.body.partial(),
});
export const AcademicDepartmentValidation = {
  academicDepartmentValidationSchema,
  updateacademicDepartmentValidationSchema,
};
