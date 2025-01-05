import { Date, Model, Types } from "mongoose";
import { IBloodGroup, IGender, IUserName } from "../Faculty/faculty.interface";
export interface IAdmin {
    id: string;
    user: Types.ObjectId;
    password: string;
    role: string;
    designation: string;
    name:IUserName;
    gender:IGender;
    dateOfBirth: Date;
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    bloodGroup: IBloodGroup;
    presentAddress: string;
    permanentAddress: string;
    profileImg?: string;
    isDeleted: boolean;
}
export interface AdminModel extends Model<IAdmin> {
    isUserExist(email: string): Promise<boolean>;
}