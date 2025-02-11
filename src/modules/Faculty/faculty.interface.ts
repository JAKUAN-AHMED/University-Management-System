import { Date, Model, Types } from "mongoose";

export type IGender = 'male' | 'female' | 'other';
export type IBloodGroup =
  | 'A+'
  | 'A-'
  | 'B+'
  | 'B-'
  | 'AB+'
  | 'AB-'
  | 'O+'
  | 'O-';

export interface IUserName{
  firstName: string;
  middleName: string;
  lastName: string;
};
export interface IFaculty{
    id:string;
    user:Types.ObjectId;
    designation:string;
    name:IUserName;
    gender:IGender;
    dateOfBirth?:Date;
    email:string;
    contactNo:string;
    emergencyContactNo:string;
    bloodGroup?:IBloodGroup;
    presentAddress:string;
    permanentAddress:string;
    profileImage?:string;
    academicDepartment:Types.ObjectId;
    academicFaculty:Types.ObjectId;
    isDeleted:boolean;
}

//for custom operations like find,create,update etc
export interface facultyModel extends Model<IFaculty>{
  isUserExists(id:string):Promise<IFaculty|null>;
}