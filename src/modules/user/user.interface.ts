import { Document, Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export  interface IUser{
    id:string;
    password:string;
    needsPasswordChange:boolean;
    passwordChangedAt?:Date;
    role:'student' | 'faculty' |'admin';
    status:'in-progress' | 'blocked';
    isDeleted:boolean;
}


export interface UserInterfaceModel extends Model<IUser> {
  isUserExistByCustomId: (id: string) => Promise<IUser>;
  isDeletedUser: (id: string) => Promise<boolean>;
  UserStatus: (id: string) => Promise<string>;
  isPasswordMatch: (
    password: string,
    storedHashedPassword: string,
  ) => Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
};


export type TUSER_ROLE = keyof typeof USER_ROLE;