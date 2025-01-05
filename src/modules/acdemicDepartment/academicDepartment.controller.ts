import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicDepartmentServices } from "./academicDepartment.services";
import httpStatus from 'http-status';
const createAcademicDepartmentController = catchAsync(async (req, res, next) => {
  const payload = req.body;
  const result =
    await AcademicDepartmentServices.createAcademicDepartmentIntoDb(payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department Created Successfully',
    data: result,
  });
});

const getAllAcademicDepartmentsController = catchAsync(async (req, res, next) => {
  const result = await AcademicDepartmentServices.getAllAcademicDepartmentsFromDb();
  sendResponse(res, {
    statusCode:httpStatus.OK,
    success: true,
    message:
      result && result.length > 0
        ? `Academic Departments  data got Successfully`
        : `There is no Data available`,
    data: result && result.length > 0 ? result : [],
  });
});

const getAcademicDepartmentController = catchAsync(async (req, res, next) => {
  const result = await AcademicDepartmentServices.getAcademicDepartmentByIdFromDb(
    req.params.departmentId,
  );
  sendResponse(res, {
    statusCode:httpStatus.OK,
    success: true,
    message: result
      ? `Academic Department  data got Successfully `
      : `Department Not Found`,
    data: result || {},
  });
});

const updateAcademicDepartmentController = catchAsync(async (req, res, next) => {
  const result = await AcademicDepartmentServices.updateAcademicDepartmentByIdIntoDb(
    req.body,
    req.params.departmentId,
  );
  sendResponse(res, {
    statusCode:httpStatus.OK,
    success: true,
    message: result ? 'Updated Department Data' : 'Not found',
    data: result || {},
  });
});

const deleteAcademicDepartmentController = catchAsync(async (req, res, next) => {
  const result = await AcademicDepartmentServices.deleteAcademicDepartmentByIdFromDb(
    req.params.departmentId,
  );
  sendResponse(res, {
    statusCode:httpStatus.OK,
    success: true,
    message: result
      ? `Successfully Deleted ${req.params.departmentId}`
      : `Its Already Deleted before requested`,
    data: {},
  });
});

export const AcademicDepartmentController = {
  createAcademicDepartmentController,
  getAllAcademicDepartmentsController,
  getAcademicDepartmentController,
  updateAcademicDepartmentController,
  deleteAcademicDepartmentController,
};
