import { IAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFacultyModel } from "./academicFaculty.model";

const createAcademicFacultyIntoDb=async(payload:IAcademicFaculty)=>{
    const result=await AcademicFacultyModel.create(payload);
    return result;
}

const getAllAcademicFacultiesFromDb=async()=>{
    return await AcademicFacultyModel.find();
}

const getAcademicFacultyByIdFromDb=async(id:string)=>{
    const result=await AcademicFacultyModel.findById({_id:id});
    return result;
}

const updateAcademicFacultyByIdIntoDb=async(payload:Partial<IAcademicFaculty>,id:string)=>{
    const result=await AcademicFacultyModel.findByIdAndUpdate(id,payload,{
        new:true,
        runValidators:true
    })
    return result;
}

const deleteAcademicFacultyByIdFromDb=async(id:string)=>{
    const result=await AcademicFacultyModel.findByIdAndDelete({_id:id});
    return result;
}

export const AcademicFacultServices={
    createAcademicFacultyIntoDb,
    getAllAcademicFacultiesFromDb,
    getAcademicFacultyByIdFromDb,
    updateAcademicFacultyByIdIntoDb,
    deleteAcademicFacultyByIdFromDb,
}