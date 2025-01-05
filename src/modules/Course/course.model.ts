import { Schema, model } from 'mongoose';
import { ICourse,ICoursefaculty,IPreRequisiteCourses } from './course.interface';

const preRequisiteCoursesSchema = new Schema<IPreRequisiteCourses>(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: false,
  },
);




const courseSchema = new Schema<ICourse>(
  {
    title: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    prefix: {
      type: String,
      trim: true,
      required: true,
    },
    code: {
      type: Number,
      trim: true,
      required: true,
    },
    credits: {
      type: Number,
      trim: true,
      required: true,
    },
    preRequisiteCourses: {type:[preRequisiteCoursesSchema],default:[]},
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

//pre hooks
//pre find

courseSchema.pre('find',function(next){
    this.find({isDeleted:false});
    next();
})

courseSchema.pre('findOne',function(next){
    this.findOne({isDeleted:false});
    next();
})

export const CourseModel = model<ICourse>('Course', courseSchema);


//assign faculites with course schema
const courseFacultySchema = new Schema<ICoursefaculty>({
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    unique: true,
  },
  faculties: [
    {
      type: Schema.Types.ObjectId,
      unique:true,
      ref: 'Faculty',
    },
  ],
});


export const CourseFacultyModel = model<ICoursefaculty>(
  'CourseFaculty',
  courseFacultySchema,
);

