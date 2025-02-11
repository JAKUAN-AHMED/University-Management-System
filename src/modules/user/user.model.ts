import { Schema } from "mongoose";
import { IUser, UserInterfaceModel } from "./user.interface";
import { model } from "mongoose";
import bcrypt from 'bcrypt';
import config from "../../config";
import { UserStatus } from "./user.constant";
const userSchema=new Schema<IUser,UserInterfaceModel>({
    id:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,select:0},
    needsPasswordChange:{type:Boolean,default:true},
    passwordChangedAt:{type:Date},
    role:{type:String,enum:['superAdmin','student','faculty','admin'],required:true},
     status:{type:String,enum:UserStatus,default:'in-progress'},
    isDeleted:{type:'Boolean',default:false}
},{
    timestamps:true
});
userSchema.pre('save', async function (next) {
  const currentUser = this; //doc
  currentUser.password = await bcrypt.hash(
    currentUser.password,
    Number(config.brcypt_salt_rounds),
  );
  next();
});

//set ' ' after saving password
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});


//static method for checking if user exist by custom id
userSchema.statics.isUserExistByCustomId = async function (id: string) {
  return this.findOne({ id }).select('+password');
}

//check if user is deleted
userSchema.statics.isDeletedUser = async function (id:string) {
  const isDeleted = await this.findOne({ id, isDeleted: true });
  return isDeleted;
};

//check the user status
userSchema.statics.UserStatus = async function (id: string) {
  const user = await this.findOne({ id ,status:'blocked'});
  return user;
}

//check is password match
userSchema.statics.isPasswordMatch = async function (password: string, storedHashedPassword: string) {
  return bcrypt.compare(password, storedHashedPassword);
}

//
userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number,
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};
export const UserModel=model<IUser,UserInterfaceModel>('User',userSchema);