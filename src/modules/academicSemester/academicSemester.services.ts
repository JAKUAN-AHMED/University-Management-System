import { Request } from 'express';
import { academicSemesterNameCodeMapper } from './academicSemester.constans';
import { IacademicSemester} from './academicSemester.interface';
import { academicSemesterModel } from './academicSemester.model';
import AppError from '../../errors/AppError';

//create semester
const createAcademicSemesterDb = async (payload: IacademicSemester) => {

    //logic for name 
    if(academicSemesterNameCodeMapper[payload.name]!=payload.code)
    {
        throw new AppError(505,'Invalid Semester Code');
    }
  const result = await academicSemesterModel.create(payload);
  return result;
};

//get all semester
const getAllAcademicSemestersDb=async()=>{
  return await academicSemesterModel.find();
}
//get a single semester by id
const getAcademicSemesterByIdDb=async(id:string)=>{
  
  const semester=await academicSemesterModel.findById({_id:id});
  return semester;
}


//detele semester by Id
const deleteAcademicSemesterByIdDb=async(id:string)=>{
  const semester=await academicSemesterModel.findByIdAndDelete({_id:id});
  return semester;
}

//update SEMESTER BY ITS ID
const updateAcademicSemesterFromDb=async(id:string,payload:IacademicSemester)=>{
  if(payload.name && payload.code && academicSemesterNameCodeMapper[payload.name]!=payload.code)
  {
    throw new AppError(505,'Invalid Semester Code');
  }
  const semester = await academicSemesterModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return semester;
}
export const AcademicSemesterServices = {
  createAcademicSemesterDb,
  getAllAcademicSemestersDb,
  getAcademicSemesterByIdDb,
  deleteAcademicSemesterByIdDb,
  updateAcademicSemesterFromDb,
};
