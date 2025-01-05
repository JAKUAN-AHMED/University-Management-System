import express from "express";
import { studentRoutes } from "../modules/student/student.route";
import { UserRoutes } from "../modules/user/user.routes";
import { AcademicSemesterRoutes } from "../modules/academicSemester/academicSemester.routes";
import { AcademicFacutltiesRoutes } from "../modules/academicFaculty/academicFaculty.routes";
import { AcademicDepartmentsRoutes } from "../modules/acdemicDepartment/academicDepartment.routes";
import { facultyRouter } from "../modules/Faculty/faculty.routes";
import { AdminRoutes } from "../modules/Admin/admin.routes";
import { CourseRoutes } from "../modules/Course/course.routes";
import { SemesterRegistrationRoutes } from "../modules/semesterRegistration/semesterRegistration.routes";
import { OfferedCourseRoutes } from "../modules/OfferedCourse/OfferedCourse.routes";
import { AuthRoutes } from "../modules/Auth/Auth.routes";
const router=express.Router();


const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/students',
    route: studentRoutes,
  },
  {
    path: '/faculties',
    route: facultyRouter,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/courses',
    route: CourseRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacutltiesRoutes,
  },
  {
    path: '/academic-departments',
    route: AcademicDepartmentsRoutes,
  },
  {
    path: '/semester-registrations',
    route: SemesterRegistrationRoutes,
  },
  {
    path: '/offered-courses',
    route: OfferedCourseRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
];
moduleRoutes.forEach(route=>router.use(route.path,route.route))






export default router;