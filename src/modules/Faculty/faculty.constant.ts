import { IBloodGroup, IGender } from './faculty.interface';

export const Gender: IGender[] = ['male', 'female', 'other'];
export const bloodGroup: IBloodGroup[] = [
  'A+',
  'A-',
  'B+',
  'B-',
  'AB+',
  'AB-',
  'O+',
  'O-',
];
export const FacultySearchableFields = [
  'email',
  'id',
  'contactNo',
  'emergencyContactNo',
  'name.firstName',
  'name.lastName',
  'name.middleName',
];