import { z } from 'zod';

const createAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum(['Autumn', 'Fall', 'Summer']),
    year: z.string(),
    code: z.enum(['01', '02', '03']),
    startMonth: z.enum([
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]),
    endMonth: z.enum([
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]),
  }),
});

const upateAcademicSemesterValidationSchema=createAcademicSemesterValidationSchema.partial();
export const AcademicSemesterValidationSchema = {
  createAcademicSemesterValidationSchema,
  upateAcademicSemesterValidationSchema,
};