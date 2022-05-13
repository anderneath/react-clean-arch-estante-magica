import { atom } from 'recoil'

export const State = atom({
  key: 'LoginState',
  default: {
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    error: '',
    isLoading: false,
    showError: false,
    showPassword: false
  }
})
