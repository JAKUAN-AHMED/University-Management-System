import { model, Schema } from 'mongoose';
import { facultyModel, IFaculty, IUserName } from './faculty.interface';
import { bloodGroup, Gender } from './faculty.constant';

/**
 * remains pre hooks after fill remove this comments
 */

export const userNameSchema = new Schema<IUserName>({
  firstName: {
    type: String,
    required: [true, 'firstName is required'],
    trim: true,
    maxLength: [20, "Name can't be more than 20 characters"],
  },
  middleName: {
    type: String,
    trime: true,
  },
  lastName: {
    type: String,
    required: [true, 'lastName is required'],
    trim: true,
    maxLength: [20, "Name can't be more than 20 characters"],
  },
});

const facultySchema = new Schema<IFaculty, facultyModel>(
  {
    id: {
      type: String,
      required: [true, 'Id is required'],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      unique: true,
      required: [true, 'User id is required'],
      ref: 'User',
    },
    designation: {
      type: String,
      required: [true, 'Designation is required'],
    },
    name: {
      type: userNameSchema,
      required: [true, 'Name is required'],
    },
    gender: {
      type: String,
      enum: {
        values: Gender,
        message: '{VALUE} is not required',
      },
      required: [true, 'gender is required'],
    },
    dateOfBirth: { type: Date },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    contactNo: { type: String, required: [true, 'Contact number is required'] },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency contact number is required'],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: bloodGroup,
        message: '{VALUE} is not a valid blood group',
      },
    },
    presentAddress: {
      type: String,
      required: [true, 'Present address is required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent address is required'],
    },
    profileImg: { type: String },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      ref: 'User',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

// generating full name
facultySchema.virtual('fullName').get(function(){
    return (
        this?.name?.firstName+' '+this?.name?.middleName+' '+this?.name?.lastName
    )
})

//filter out deleted documents
facultySchema.pre('find',function(next){
    this.find({isDeleted:{$ne:true}});
    next();
})

facultySchema.pre('findOne',function(next){
    this.find({isDeleted:{$ne:true}});
    next();
})

facultySchema.pre('aggregate',function(next){
    this.pipeline().unshift({$match:{isDeleted:{$ne:true}}});
    next();
})

//checking user is already exist or not
facultySchema.statics.isUserExists=async function(id:string){
    const existingUser=await FacultyModel.findOne({id});
    return existingUser;
}

//model
export const FacultyModel = model<IFaculty, facultyModel>('Faculty', facultySchema);