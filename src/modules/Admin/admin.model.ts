import { model, Schema } from 'mongoose';
import { AdminModel, IAdmin } from './admin.interface';
import { userNameSchema } from '../Faculty/faculty.model';
import { bloodGroup, Gender } from '../Faculty/faculty.constant';
const AdminSchema=new Schema<IAdmin>({
    id:{type:String,required:[true,'Id is required'],unique:true},
    user:{type:Schema.Types.ObjectId,ref:'User',required:[true,'User is required']},
    designation:{type:String,required:[true,'Designation is required']},
    name:{
        type:userNameSchema,
    },
    contactNo
    :{type:String,required:[true,'Contact No is required']},
    permanentAddress:{type:String,required:[true,'Permanent address is required']},
    presentAddress:{type:String,required:[true,'Present address is required']},
    dateOfBirth:{type:Date},
    email:{type:String,required:[true,'Email is required'],unique:true},
    emergencyContactNo:{type:String,required:[true,'Emergency contact no is required']},
    bloodGroup:{type:String,enum:{values:bloodGroup,message:'{VALUE} is not a valid blood group'}},
    profileImg:{type:String},
    isDeleted:{type:Boolean,default:false},
    gender:{
        type:String,
        enum: 
        {
        values: Gender,
        message: '{VALUE} is not a valid gender'},
    }
},{
   toJSON: { virtuals: true },
})

//getting fullName of admin
AdminSchema.virtual('fullName').get(function(){
    return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
})

//cuase:soft delete
AdminSchema.pre('find',function(next){
    this.find({isDeleted:false});
    next();
})

AdminSchema.pre('findOne',function(next){
    this.findOne({isDeleted:false});
    next();
})

AdminSchema.pre('aggregate',function(next){
    this.pipeline().unshift({$match:{isDeleted:false}});
    next();
});
    


export const AdminSchemaModel=model<IAdmin,AdminModel>('Admin',AdminSchema);