import { z } from 'zod';

const guardianValidationSchema = z.object({
  fatherName: z.string().min(1),
  fatherOccupation: z.string().min(1),
  fatherContactNo: z.string().min(1),
  motherName: z.string().min(1),
  motherOccupation: z.string().min(1),
  motherContactNo: z.string().min(1),
});

const localGuardianValidationSchema = z.object({
  name: z.string().min(1),
  occupation: z.string().min(1),
  contactNo: z.string().min(1),
  address: z.string().min(1),
});

const CreatestudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: z.object({
        firstName: z.string().min(1),
        middleName: z.string().optional(),
        lastName: z.string().min(1),
      }),
      gender: z.enum(['male', 'female', 'other']),
      dateOfBirth: z
        .string()
        .refine((val) => !isNaN(Date.parse(val)), {
          message: 'Invalid date format',
        }) 
        .transform((val) => new Date(val)),
      contactNo: z.string().min(1),
      email: z.string().email(),
      emergencyContactNo: z.string().min(1),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'])
        .optional(),
      presentAddress: z.string().min(1),
      permanentAddress: z.string().min(1),
      guardian: guardianValidationSchema,
      localguardian: localGuardianValidationSchema,
      profileImage: z.string().optional(),
      admissionSemester: z.string(),
    }),
  }),
});


const UpdateStudentValidationSchema = z.object({
  body: z.object({
    student: z
      .object({
        name: z
          .object({
            firstName: z.string().optional(), // Optional for updates
            middleName: z.string().optional(),
            lastName: z.string().optional(),
          })
          .optional(), // Optional for updates
        gender: z.enum(['male', 'female', 'other']).optional(),
        dateOfBirth: z
          .string()
          .optional()
          .refine((val) => !val || !isNaN(Date.parse(val)), {
            message: 'Invalid date format',
          })
          .transform((val) => (val ? new Date(val) : undefined)),
        contactNo: z.string().optional(),
        email: z.string().email().optional(),
        emergencyContactNo: z.string().optional(),
        bloodGroup: z
          .enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'])
          .optional(),
        presentAddress: z.string().optional(),
        permanentAddress: z.string().optional(),
        guardian: guardianValidationSchema.optional(),
        localguardian: localGuardianValidationSchema.optional(),
        profileImage: z.string().optional(),
        admissionSemester: z.string().optional(),
      })
      .optional(),
  }),
});

export const studentValidationSchemas = {
  CreatestudentValidationSchema,
  UpdateStudentValidationSchema,
};
