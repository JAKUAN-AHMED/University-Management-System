import { IAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartmentModel } from "./academicDepartment.model";

const createAcademicDepartmentIntoDb = async (payload: IAcademicDepartment) => {
  
  const result = await AcademicDepartmentModel.create(payload);
  return result;
};

const getAllAcademicDepartmentsFromDb = async () => {
  return await AcademicDepartmentModel.find().populate('academicFaculty');
};

const getAcademicDepartmentByIdFromDb = async (id: string) => {
  const result = await AcademicDepartmentModel.findById({ _id: id }).populate(
    'academicFaculty',
  );
  return result;
};

const updateAcademicDepartmentByIdIntoDb = async (
  payload: Partial<IAcademicDepartment>,
  id: string,
) => {
  const result = await AcademicDepartmentModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteAcademicDepartmentByIdFromDb = async (id: string) => {
  const result = await AcademicDepartmentModel.findByIdAndDelete({ _id: id });
  return result;
};

export const AcademicDepartmentServices = {
  createAcademicDepartmentIntoDb,
  getAllAcademicDepartmentsFromDb,
  getAcademicDepartmentByIdFromDb,
  updateAcademicDepartmentByIdIntoDb,
  deleteAcademicDepartmentByIdFromDb,
};
