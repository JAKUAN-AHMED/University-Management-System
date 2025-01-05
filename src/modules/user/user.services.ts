import { academicSemesterModel } from './../academicSemester/academicSemester.model';
import config from '../../config';
import { TStudent } from '../student/student.interface';
import { IUser } from './user.interface';
import { UserModel } from './user.model';
import { Student } from '../student/student.model';

import { generateAdminId, generatedFacultyId, generateStudentId } from './user.utils';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import { AcademicDepartmentModel } from '../acdemicDepartment/academicDepartment.model';
import { FacultyModel } from '../Faculty/faculty.model';
import { AdminSchemaModel } from '../Admin/admin.model';
import { IAdmin } from '../Admin/admin.interface';

const createStudentFromDb = async (password: string, payload: TStudent) => {
  const userData: Partial<IUser> = {};
  //is password not given ,use default password
  userData.password = password || (config.default_pass as string);

  //set student role
  userData.role = 'student';

  //find admissionsemester
  const AdmissionSemester: any = await academicSemesterModel.findById(
    payload.admissionSemester,
  );

  const session = await mongoose.startSession();

  try {
    //start
    session.startTransaction();

    userData.id = await generateStudentId(AdmissionSemester);
    //create a user (transaction-1)
    const newUser = await UserModel.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    //set id,_id as user
    payload.id = newUser[0].id; //embeding id
    payload.user = newUser[0]._id; //ref id

    //create a student (transaction-2)
    const newStudent = await Student.create([payload], { session });

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    //  commit session
    await session.commitTransaction();
    //end session
    await session.endSession();

    return newStudent;
  } catch (err:any) {
    //abort transaction
    await session.abortTransaction();
    //end session
    await session.endSession();
    throw new Error(err)
  }
};

//create faculty
const createFacultyIntoDb = async (password: string, payload: any) => {
 //create a user
 const userData:Partial<IUser> = {};
 userData.password=password || (config.default_pass as string);
 
 //set faculty role
 userData.role='faculty';

 //find academic department
 const department=await AcademicDepartmentModel.findById(payload.academicDepartment);

 //throw error if department not found
  if(!department){
    throw new AppError(httpStatus.NOT_FOUND,'Department not found');
  }


  const session=await mongoose.startSession();
  try
 {
    
  session.startTransaction();
  //set department id
    userData.id=await generatedFacultyId();
    
    //create a user(transaction-1)
    const newUser=await UserModel.create([userData],{session});
    payload.id=newUser[0].id;
    payload.user=newUser[0]._id;

    //create a faculty (transaction-2)
    const newFaculty=await FacultyModel.create([payload],{session});
    
    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }
    await session.commitTransaction();
    await session.endSession();
    return newFaculty;
  }catch(err:any){
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);

  }
};


const createAdminIntoDb = async (password: string, payload: IAdmin) => {
  const userData: Partial<IUser> = {};
  userData.password = password || (config.default_pass as string);
  userData.role = 'admin';
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    userData.id = await generateAdminId();
    const newUser = await UserModel.create([userData], { session });
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;
    const newAdmin = await AdminSchemaModel.create([payload], { session });
    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }
    await session.commitTransaction();
    await session.endSession();
    return newAdmin;
  } catch (err:any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};
//get all users
const getAllUsersFromDb = async () => {
  const users = await UserModel.find();
  return users;
};
export const UserServices = {
  createStudentFromDb,
  createFacultyIntoDb,
  createAdminIntoDb,
  getAllUsersFromDb,
};
