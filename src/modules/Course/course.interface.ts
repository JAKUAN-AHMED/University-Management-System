import { Types } from 'mongoose';

export interface IPreRequisiteCourses {
  course: Types.ObjectId;
  isDeleted: boolean;
}

export type ICourse = {
  title: string;
  prefix: string;
  code: number;
  credits: number;
  isDeleted?: boolean;
  preRequisiteCourses?: IPreRequisiteCourses[];
};

export interface ICoursefaculty {
  course: Types.ObjectId;
  faculties: Types.ObjectId[];
};