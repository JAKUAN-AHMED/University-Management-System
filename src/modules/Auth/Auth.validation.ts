import { z } from 'zod';


//user login
const loginValidationSchema = z.object({
  body: z.object({
    id: z.string({ required_error: 'id is required' }),
    password: z.string({ required_error: 'password is required' }),
  }),
});

// change password
const ChangePassValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({ required_error: 'Old password is required' }),
    newPassword: z.string({ required_error: 'password is required' }),
  }),
});


const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required!',
    }),
  }),
});

const forgetPasswordValidationSchema=z.object({
  body:z.object({
    id:z.string({required_error:"User id is required"})
  })
});
const resetPasswordValidationSchema=z.object({
  body:z.object({
    id:z.string({required_error:"User id is required"}),
    newPassword:z.string({required_error:"User password is required"}),
  })
});
export const AuthValidation = {
  loginValidationSchema,
  ChangePassValidationSchema,
  refreshTokenValidationSchema,
  forgetPasswordValidationSchema,
  resetPasswordValidationSchema,
};
