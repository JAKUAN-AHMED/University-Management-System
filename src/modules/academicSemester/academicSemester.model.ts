import { model, Schema } from 'mongoose';
import { IacademicSemester, IMonth } from './academicSemester.interface';
import AppError from '../../errors/AppError';
const AcademicSemesterSchema = new Schema<IacademicSemester>(
  {
    name: {
      type: String,
      required:true,
      enum: ['Autumn', 'Fall', 'Summer'],
    },
    year: {
      required:true,
      type: String,
    },
    code: {
      type: String,
      required:true,
      enum: ['01', '02', '03'],
    },
    startMonth: {
      type: String,
      required:true,
      enum: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
    },
    endMonth: {
      type: String,
      required:true,
      enum: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
    },
  },
  {
    timestamps: true,
  },
);

AcademicSemesterSchema.pre('save',async function(next){

  const isSemesterExist=await academicSemesterModel.findOne({
    year:this.year,
    name:this.name,
  })
  if(isSemesterExist)
  {
    throw new AppError(httpStatus.NOT_FOUND,'Semester Already Exists');
  }
  next();
})



export const academicSemesterModel = model<IacademicSemester>(
  'AcademicSemester',
  AcademicSemesterSchema,
);
