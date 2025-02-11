import { Schema, model } from 'mongoose';
import {
  TStudent,
  StudentModel,
  TUserName,
  TGuardian,
  TLocalGuardian,
} from './student.interface';
const useSchema = new Schema<TUserName>({
  firstName: { type: String, required: true, trim: true, maxlength: 20 },
  middleName: { type: String, trim: true },
  lastName: { type: String, required: true },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
});

const localguardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
});

const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: { type: String, required: [true, 'Id is required'], unique: true },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'User',
    },
    name: useSchema,
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: true,
    },
    dateOfBirth: { type: Date },
    contactNo: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    emergencyContactNo: { type: String, required: true },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
    },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    guardian: guardianSchema,
    localguardian: localguardianSchema,
    profileImage: { type: String ,default:''},
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    toJSON: {
      virtuals: true,
      versionKey: false,
    },
  },
);

//virtual existence
studentSchema.virtual('fullName').get(function (){
  return  `${this?.name?.firstName} ${this?.name?.middleName} ${this?.name?.lastName}`
})



//find -all
studentSchema.pre('find',async function(next){
  this.find({isDeleted:{$ne:true}})
  next();
})


//findOne -single
studentSchema.pre('findOne',async function(next){
  this.findOne({isDeleted:{$ne:true}})
  next();
})

//aggregate one
studentSchema.pre('aggregate',async function(next){
  this.pipeline().unshift({$match:{isDeleted:{$ne:true}}})
  next();
})



//creating a custom static method
studentSchema.statics.isUserExist = async (id: string) => {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
