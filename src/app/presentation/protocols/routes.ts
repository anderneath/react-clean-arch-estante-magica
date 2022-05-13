export const Routes = {
  login: '/login',
  signup: '/signup',
  home: '/',
  listClasses: '/class',
  addClass: '/class/add',
  listStudents: (classId: string = ':classId') => `/class/${classId}/student`,
  addStudents: (classId: string = ':classId') => `/class/${classId}/student/add`
}
