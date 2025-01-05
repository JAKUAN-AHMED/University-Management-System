import { z } from "zod"
import { SemesterRegistrationStatus } from "./semesterRegistraion.constant";

const createSemesterRegistrationValidation = z.object({
  body: z.object({
    academicSemester: z.string(),
    status: z.enum([...(SemesterRegistrationStatus as [string, ...string[]])]),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    minCredit: z.number(),
    maxCredit: z.number(),
  }),
});


const updateSemesterRegistrationValidation=z.object({
    body:createSemesterRegistrationValidation.shape.body.partial()
})
export const SemesterRegistrationValidations={
    createSemesterRegistrationValidation,
    updateSemesterRegistrationValidation
}