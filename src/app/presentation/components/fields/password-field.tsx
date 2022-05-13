import { TextField, TextFieldProps } from '@/app/presentation/components'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import React from 'react'

export const PasswordField: React.FC<TextFieldProps> = ({
  state,
  setState,
  ...props
}: TextFieldProps) => {
  const { isLoading, showPassword } = state

  const onEyeClicked = (): void => {
    setState({ ...state, showPassword: !showPassword })
  }

  return (
    <TextField
      type={showPassword ? 'text' : 'password'}
      {...props}
      state={state}
      setState={setState}
      suffixIcon={
        <button type="button" onClick={onEyeClicked} disabled={isLoading}>
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </button>
      }
    />
  )
}
