import { atom } from 'recoil'

export const State = atom({
  key: 'AddClassState',
  default: {
    name: '',
    nameError: '',
    grade: '',
    gradeError: '',
    teacherName: '',
    teacherNameError: '',
    error: '',
    showError: false,
    isLoading: false
  }
})
