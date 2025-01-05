import mongoose from "mongoose";
import QueryBuilder from "../../builder/Querybuilder";
import AppError from "../../errors/AppError";

import { RegistrationStatus } from "./semesterRegistraion.constant";
import { IsemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistrationModel } from "./semesterRegistration.model"
import httpStatus from "http-status";
import { academicSemesterModel } from "../academicSemester/academicSemester.model";
const createSemesterRegistrationIntoDB=async(payload:IsemesterRegistration)=>{
  /**
   * Step1: Check if there any registered semester that is already 'UPCOMING'|'ONGOING'
   * Step2: Check if the semester is exist
   * Step3: Check if the semester is already registered!
   * Step4: Create the semester registration
   */

  const academicSemester = payload?.academicSemester;

  //check if there any registered semester that is already 'UPCOMING'|'ONGOING'
  const isThereAnyUpcomingOrOngoingSemester =
    await SemesterRegistrationModel.findOne({
      $or: [
        { status: RegistrationStatus.UPCOMING },
        { status: RegistrationStatus.ONGOING },
      ],
    });

  if (isThereAnyUpcomingOrOngoingSemester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is aready an ${isThereAnyUpcomingOrOngoingSemester.status} registered semester !`,
    );
  }
  // check if the semester is exist
  const isAcademicSemesterExists =
    await academicSemesterModel.findById(academicSemester);

  if (!isAcademicSemesterExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This academic semester not found !',
    );
  }

  // check if the semester is already registered!
  const isSemesterRegistrationExists = await SemesterRegistrationModel.findOne({
    academicSemester,
  });

  if (isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This semester is already registered!',
    );
  }

  const result = await SemesterRegistrationModel.create(payload);
  return result;
}

const getSingleSemesterRegistration=async(id:string)=>{
    const result=await SemesterRegistrationModel.findById(id);
    return result;
}

const getAllSemesterRegistration=async(query:Record<string,unknown>)=>{
    const semesterRegistrationQuery = new QueryBuilder(
      SemesterRegistrationModel.find().populate('academicSemester'),
      query,
    )
      .filter()
      .sort()
      .paginate()
      .fields();

    const result = await semesterRegistrationQuery.modelQuery;
    return result;
}
const updateSemesterRegistrationIntoDB=async(id:string,payload:Partial<IsemesterRegistration>)=>{
  /**
   * Step1: Check if the semester is exist
   * Step2: Check if the requested registered semester is exists
   * Step3: If the requested semester registration is ended, we will not update anything
   * Step4: If the requested semester registration is 'UPCOMING', we will let update everything.
   * Step5: If the requested semester registration is 'ONGOING', we will not update anything  except status to 'ENDED'
   * Step6: If the requested semester registration is 'ENDED' , we will not update anything
   *
   * UPCOMING --> ONGOING --> ENDED
   *
   */

  // check if the requested registered semester is exists
  // check if the semester is already registered!
  const isSemesterRegistrationExists = await SemesterRegistrationModel.findById(id);

  if (!isSemesterRegistrationExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This semester is not found !');
  }

  //if the requested semester registration is ended , we will not update anything
  const currentSemesterStatus = isSemesterRegistrationExists?.status;
  const requestedStatus = payload?.status;

  if (currentSemesterStatus === RegistrationStatus.ENDED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This semester is already ${currentSemesterStatus}`,
    );
  }

  // UPCOMING --> ONGOING --> ENDED
  if (
    currentSemesterStatus === RegistrationStatus.UPCOMING &&
    requestedStatus === RegistrationStatus.ENDED
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not directly change status from ${currentSemesterStatus} to ${requestedStatus}`,
    );
  }

  if (
    currentSemesterStatus === RegistrationStatus.ONGOING &&
    requestedStatus === RegistrationStatus.UPCOMING
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not directly change status from ${currentSemesterStatus} to ${requestedStatus}`,
    );
  }

  const result = await SemesterRegistrationModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
}



export const SemesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
  getSingleSemesterRegistration,
  getAllSemesterRegistration,
  updateSemesterRegistrationIntoDB,
};