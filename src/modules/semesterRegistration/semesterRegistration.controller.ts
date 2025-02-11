import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SemesterRegistrationServices } from './semesterRegistration.services';
import httpStatus from 'http-status';
const createSemesterRegistration = catchAsync(async (req, res) => {
  const registration =
    await SemesterRegistrationServices.createSemesterRegistrationIntoDB(
      req.body,
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Registered successfully',
    data: registration,
  });
});
const getSingleSemesterRegistration = catchAsync(async (req, res) => {
  const registration =
    await SemesterRegistrationServices.getSingleSemesterRegistration(
      req.params.id,
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Registered  Semester retrived successfully',
    data: registration,
  });
});
const getAllSemesterRegistration = catchAsync(async (req, res) => {
    const registration =
    await SemesterRegistrationServices.getAllSemesterRegistration(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Semesters Registered successfully',
        data: registration,
    });
});
const updateSemesterRegistration = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result =
      await SemesterRegistrationServices.updateSemesterRegistrationIntoDB(
        id,
        req.body,
      );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester Registration is updated successfully',
      data: result,
    });
});
const deleteSemesterRegistration = catchAsync(
  async (req, res) => {
    const { id } = req.params;
    const result =
      await SemesterRegistrationServices.deleteSemesterRegistrationFromDB(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester Registration is updated successfully',
      data: result,
    });
  },
);

export const SemesterRegistrationController = {
  createSemesterRegistration,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
  getAllSemesterRegistration,
  deleteSemesterRegistration,
  
};
