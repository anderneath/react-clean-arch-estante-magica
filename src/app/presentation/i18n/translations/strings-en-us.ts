import { Strings } from '@/app/presentation/i18n/strings'

export class StringsEnUs implements Strings {
  loading = 'Loading'

  logout = 'Logout'

  logoutDialogContent = 'Are you sure you want to exit?'

  logoutDialogTitle = 'Logout'

  noClassFoundSubtitle = 'Start by registering your classes and students now.'

  noClassFound = 'No class found!'

  actions = 'Actions'

  teacher = 'Teacher'

  listStudents = 'List students'

  addClass = 'Add class'

  className = 'Class name'

  classNamePlaceholder = 'E.g.: 1 Year A'

  grade = 'Grade'

  selectEllipsis = 'Select...'

  teacherName = 'Teacher name'

  fullName = 'Full Name'

  registerYourStudentsNow = 'Register your students now.'

  noStudentsFound = 'No students found!'

  classes = 'Classes'

  student = 'Student'

  addStudents = 'Add students'

  add = 'Add'

  cancel = 'Cancel'

  studentsNamesPlaceholder =
    'Enter a name in each line\nExample:\nMary Brown\nJohn Smith'

  studentsNames = 'Student names'

  signIn = 'Sign up'

  repeatYourPassword = 'Repeat your password'

  confirmYourPassword = 'Confirm your password'

  typeYourName = 'Enter your name'

  name = 'Name'

  createYourPassword = 'Create your password'

  alreadyHaveAccount = 'Already have an account?'

  typeYourPassword = 'Enter your password'

  typeYourEmail = 'Enter your email'

  email = 'Email'

  password = 'Password'

  signup = 'Sign up'

  firstAccess = 'Your first access?'

  login = 'Login'

  notFoundPage = 'Page not found!'

  classAlreadyExists = 'There is already a class with this name'

  passwordsDontMatch = "Passwords don't match"

  emailAlreadyFound = 'There is already an account with this email'

  studentsFullNameRequired = 'Enter the full names of all students'

  fullNameRequired = 'Enter the full name'

  unexpected = 'Unexpected error!'

  invalidCredentials = 'Invalid email or password'

  invalidEmail = 'Invalid email'

  invalidPassword = 'Invalid password'

  requiredField = 'Required field'

  minLengthRequired = (length: number) => `Minimum ${length} characters`

  locale = 'en'
}
