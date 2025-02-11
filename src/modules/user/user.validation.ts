import { z } from "zod";
import { UserStatus } from "./user.constant";

const userValidationSchema=z.object({
    password:z.string({
        invalid_type_error:'Password must be String'
    }
    ).max(20,{message:"password cant't be more than 20 char"}).optional(),
})

const changeStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum([...UserStatus] as [string, ...string[]]),
  }),
});

export const UserValidationSchema = {
  userValidationSchema,
  changeStatusValidationSchema,
};