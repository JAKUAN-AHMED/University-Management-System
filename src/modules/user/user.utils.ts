import { IacademicSemester } from '../academicSemester/academicSemester.interface';
import { UserModel } from './user.model';

const findLastStudentId = async () => {
  const lastStudent = await UserModel.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
  .sort({createdAt:-1})
  .lean(); 
  return lastStudent?.id ? lastStudent.id:undefined;
};

export const generateStudentId = async(payload: IacademicSemester) => {
  let currentId =(0).toString().padStart(4, '0');
  const lastStudentId=await findLastStudentId();
  const lastStudentSemesterCode=lastStudentId?.substring(4,6);
  const lastStudentYear=lastStudentId?.substring(0,4);
  if(lastStudentId && lastStudentSemesterCode===payload.code && lastStudentYear===payload.year){
    currentId=lastStudentId.substring(6);
  }

  let incId = (Number(currentId) + 1).toString().padStart(4, '0');
  incId = `${payload.year}${payload.code}${incId}`;
  return incId;

};

//faculty

//findLast faculty id
const findLastFacultyId = async () => {
  const lastFaculty = await UserModel.findOne(
    {
      role: 'faculty',
    },

    //projection
    {
      id: 1,
      _id: 0,
    },
  )
  .sort({createdAt:-1})
  .lean(); 
  return lastFaculty?.id ? lastFaculty.id.substring(2):undefined;
};


export const generatedFacultyId = async()=>{
  let currentId=(0).toString().padStart(4, '0');
  const lastFacultyId=await findLastFacultyId();
  if(lastFacultyId){
    currentId=lastFacultyId.substring(2);
  }
  let incId=(Number(currentId)+1).toString().padStart(4, '0');
  incId=`F-${incId}`;
  return incId;

};


//admin
const findLastAdminId = async () => {
  const lastAdmin = await UserModel.findOne(
    {
      role: 'admin',
    },
    {
      id: 1,
      _id: 0,
    },
  )
  .sort({createdAt:-1})
  .lean(); 
  return lastAdmin?.id ? lastAdmin.id:undefined;
};

export const generateAdminId = async() => {
  let currentId=(0).toString().padStart(4, '0');
  const lastAdminId=await findLastAdminId();
  if(lastAdminId){
    currentId=lastAdminId.substring(2);
  }
  let incId=(Number(currentId)+1).toString().padStart(4, '0');
  incId=`A-${incId}`;
  return incId;
};