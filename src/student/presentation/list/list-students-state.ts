import { atom } from 'recoil'

export const State = atom({
  key: 'ListStudentsState',
  default: {
    error: '',
    isLoading: false,
    students: [],
    class: undefined
  }
})
