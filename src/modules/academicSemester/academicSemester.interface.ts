export type NameCodeMapperType={
   [key: string]: string;
 };
 export type IMonth =
   | 'January'
   | 'February'
   | 'March'
   | 'April'
   | 'May'
   | 'June'
   | 'July'
   | 'August'
   | 'September'
   | 'October'
   | 'November'
   | 'December';

   
export interface IacademicSemester{
    name:'Autumn' | 'Fall' | 'Summer';
    year:string;
    code:'01' | '02' | '03';
    startMonth:IMonth;
    endMonth:IMonth;
}