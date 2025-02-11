import {model, Schema } from "mongoose";
import { IAcademicDepartment } from "./academicDepartment.interface";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const AcademicDepartmentSchema = new Schema<IAcademicDepartment>(
  {
    name: { type: String, required: true, unique: true },
    academicFaculty:{type:Schema.Types.ObjectId,ref:'AcademicFaculty'}
  },
  {
    timestamps: true,
    versionKey:false
  },
);





AcademicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isDepartmentExists = await AcademicDepartmentModel.findOne(query);
  if (!isDepartmentExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Department Already Existed');
  }
  next();
});

export const AcademicDepartmentModel = model<IAcademicDepartment>(
  'AcademicDepartment',
  AcademicDepartmentSchema,
);
