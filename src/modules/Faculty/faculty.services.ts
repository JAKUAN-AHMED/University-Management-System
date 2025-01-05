import mongoose from "mongoose";
import QueryBuilder from "../../builder/Querybuilder";
import { FacultySearchableFields } from "./faculty.constant";
import { IFaculty } from "./faculty.interface";
import { FacultyModel } from "./faculty.model";
import AppError from "../../errors/AppError";
import { UserModel } from "../user/user.model";

const getAllfacultiesFromDb = async (query:Record<string,unknown>) => {
    const facultyQuery = new QueryBuilder(FacultyModel.find().populate('academicDepartment'), query)
        .search(FacultySearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const faculties = await facultyQuery.modelQuery;
    return faculties;
};

const getSingleFacultyFromDb = async (id: string) => {
    const faculty = await FacultyModel.findById(id).populate('academicDepartment');
    return faculty;
};

const updateFacultyInDb = async (id: string, faculty:Partial<IFaculty>) => {

    const {name,...remainingFacultyData}=faculty;
    const modifiedFacultyData:Record<string,unknown>={
        ...remainingFacultyData,
    };
    if(name && Object.keys(name).length>0){
        for(const [key,value] of Object.entries(name)){
            modifiedFacultyData[`name.${key}`]=value;
        }
    };
    const updatedFaculty = await FacultyModel.findByIdAndUpdate(id, modifiedFacultyData, { new: true ,runValidators:true});
    return updatedFaculty;
};

const deleteFacultyFromDb = async (id: string) => {
    const session=await mongoose.startSession();
    try{
        session.startTransaction();
        const faculty = await FacultyModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true }).session(session);
        if (!faculty) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Faculty not found');
        }

        const userId=faculty.user;
        const deletedUser=await UserModel.findByIdAndUpdate(userId,{isDeleted:true},{new:true}).session(session);

        if(!deletedUser){
            throw new AppError(httpStatus.BAD_REQUEST, 'User not found');}
        await session.commitTransaction();
        await session.endSession();
        return faculty;
    }catch(error:any){
        await session.abortTransaction();
        await session.endSession();
        throw new Error(error);
    }
   
    
};
export const facultyServices = {
    getAllfacultiesFromDb,
    getSingleFacultyFromDb,
    updateFacultyInDb,
    deleteFacultyFromDb
};