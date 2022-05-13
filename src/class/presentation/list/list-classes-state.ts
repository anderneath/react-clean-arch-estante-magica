import { atom } from 'recoil'

export const State = atom({
  key: 'ListClassesState',
  default: {
    error: '',
    isLoading: false,
    classes: []
  }
})
