import { atom } from 'recoil'

export const State = atom({
  key: 'AddStudentsState',
  default: {
    names: '',
    namesError: '',
    error: '',
    showError: false,
    isLoading: false
  }
})
