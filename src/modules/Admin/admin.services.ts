import mongoose from "mongoose";
import QueryBuilder from "../../builder/Querybuilder";
import { AdminSearchableFields } from "./admin.constant";
import { IAdmin } from "./admin.interface";
import { AdminSchemaModel } from "./admin.model";
import AppError from "../../errors/AppError";
import { UserModel } from "../user/user.model";

const getAllAdminFromDB = async (query:Record<string,unknown>) => {
  const AdminQuery =new QueryBuilder(AdminSchemaModel.find(),query)
  .search(AdminSearchableFields)
  .filter()
  .sort()
  .paginate()
  .fields();

  const result=await AdminQuery.modelQuery;
  return result;
}

const getAdminByIdFromDB = async (id: string) => {
  const admin = await AdminSchemaModel.findById(id);
    return admin;
}

const updateAdminByIdInDB = async (id: string, payload: Partial<IAdmin>) => {

    const {name,...remainingAdminData}=payload;
    const modifiedUpdateData:Record<string,unknown>={
        ...remainingAdminData
    };

    if(name && Object.keys(name).length>0){
        for(const [key,value] of Object.entries(name)){
            modifiedUpdateData[`name.${key}`]=value;
        }
    }

    const updatedAdmin = await AdminSchemaModel.findByIdAndUpdate(id, modifiedUpdateData, { new: true ,runValidators:true});
 }
const deleteAdminByIdFromDB = async (id: string) => { 
    const session = await mongoose.startSession();
    try{
        session.startTransaction();
        const admin = await AdminSchemaModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true, runValidators: true, session });
        if(!admin){
            throw new AppError(httpStatus.BAD_REQUEST,"Failed to delete admin");
        }

        const userId=admin.user;
        //delete admin
        const deleteUser=await UserModel.findByIdAndUpdate(userId,{isDeleted:true},{new:true,runValidators:true,session});

        if(!deleteUser){
            throw new AppError(httpStatus.BAD_REQUEST,"Failed to delete user");
        }
        await session.commitTransaction();
        session.endSession();
        return admin;
    }catch(e:any){
        session.abortTransaction
        session.endSession();
        throw new Error(e);
    }
}

export const adminServices = {
    getAllAdminFromDB,
    getAdminByIdFromDB,
    updateAdminByIdInDB,
    deleteAdminByIdFromDB
}