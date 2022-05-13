import { atom } from 'recoil'

export const State = atom({
  key: 'SignUpState',
  default: {
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    nameError: '',
    emailError: '',
    passwordError: '',
    passwordConfirmationError: '',
    isLoading: false,
    showError: false,
    error: '',
    showPassword: false
  }
})
