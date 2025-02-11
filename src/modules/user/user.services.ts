import { AdminModel } from './../Admin/admin.interface';
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
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';

const createStudentFromDb = async (file:any,password: string, payload: TStudent) => {
  const userData: Partial<IUser> = {};
  //is password not given ,use default password
  userData.password = password || (config.default_pass as string);

  //set student role
  userData.role = 'student';
  //set student email
  userData.email = payload.email;

  //find admissionsemester
  const AdmissionSemester: any = await academicSemesterModel.findById(
    payload.admissionSemester,
  );
 if (!AdmissionSemester) {
   throw new AppError(400, 'Admission semester not found');
 }

 // find department
 const academicDepartment = await AcademicDepartmentModel.findById(
   payload.academicDepartment,
 );

 if (!academicDepartment) {
   throw new AppError(400, 'Academic department not found');
 }
 payload.academicFaculty = academicDepartment.academicFaculty;
  const session = await mongoose.startSession();

  try {
    //start
    session.startTransaction();

    userData.id = await generateStudentId(AdmissionSemester);
    if(file)
      {
      const imageName = `${userData.id}${payload?.name?.firstName}`;
      const path = file?.path;
      const { secure_url } = await sendImageToCloudinary(imageName, path);
      payload.profileImage = secure_url as string;
    }

    
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
const createFacultyIntoDb = async (file:any,password: string, payload: any) => {
 //create a user
 const userData:Partial<IUser> = {};
 userData.password=password || (config.default_pass as string);
 
 //set faculty role
 userData.role='faculty';
 //set facutly email
 userData.email = payload.email;

 //find academic department
 const department=await AcademicDepartmentModel.findById(payload.academicDepartment);

 //throw error if department not found
  if(!department){
    throw new AppError(httpStatus.NOT_FOUND,'Department not found');
  }

  payload.academicFaculty = department?.academicFaculty;
  const session=await mongoose.startSession();
  try
 {
    
  session.startTransaction();
  //set department id
    userData.id=await generatedFacultyId();
    if (file) {
      const imageName = `${userData.id}${payload?.name?.firstName}`;
      const path = file?.path;
      const { secure_url } = await sendImageToCloudinary(imageName, path);
      payload.profileImage = secure_url as string;
    }



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


const createAdminIntoDb = async (file:any,password: string, payload: IAdmin) => {
  const userData: Partial<IUser> = {};
  userData.password = password || (config.default_pass as string);
  //set admin role
  userData.role = 'admin';
  //set admin email
  userData.email = payload.email;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    userData.id = await generateAdminId();

    if (file) {
      const imageName = `${userData.id}${payload?.name?.firstName}`;
      const path = file?.path;
      const { secure_url } = await sendImageToCloudinary(imageName, path);
      payload.profileImage = secure_url as string;
    }

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
  } catch (err: any) {
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

//GET ME
const getMe = async (userId: string, role: string) => {
  // const decoded = verifyToken(token, config.jwt_access_secret as string);
  // const { userId, role } = decoded;

  let result = null;
  if (role === 'student') {
    result = await Student.findOne({ id: userId }).populate('user');
  }
  if (role === 'admin') {
    result = await AdminSchemaModel.findOne({ id: userId }).populate('user');
  }

  if (role === 'faculty') {
    result = await FacultyModel.findOne({ id: userId }).populate('user');
  }

  return result;
};

const changeStatus = async (id: string, payload: { status: string }) => {
  const result = await UserModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};
export const UserServices = {
  createStudentFromDb,
  createFacultyIntoDb,
  createAdminIntoDb,
  getAllUsersFromDb,
  getMe,
  changeStatus,
};
