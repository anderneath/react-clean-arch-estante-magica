import { FieldStyle as Style } from '@/app/presentation/components/fields'
import React from 'react'

type Props = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> & {
  name: string
  state: any
  setState: any
  placeholder?: string
  label?: string
  labelHidden?: boolean
  errorHidden?: boolean
  error?: string
}

export const TextAreaField: React.FC<Props> = ({
  name,
  state,
  setState,
  label,
  placeholder,
  labelHidden = false,
  errorHidden = false,
  error,
  ...props
}: Props) => {
  error = error ?? state[`${name}Error`]
  const { isLoading, showError } = state

  const handleOnFocus = (e: any): void => {
    e.target.readOnly = false
  }

  return (
    <div className={Style.inputContainer}>
      {!labelHidden && <label htmlFor={Style.inputWrap}>{label}</label>}
      <textarea
        {...props}
        name={name}
        data-status={
          showError && error
            ? 'invalid'
            : isLoading || props.disabled
            ? 'disabled'
            : 'valid'
        }
        placeholder={placeholder}
        readOnly
        onFocus={handleOnFocus}
        onChange={e =>
          setState({
            ...state,
            [e.target.name]: e.target.value
          })
        }
      />
      {!errorHidden && (
        <div className={Style.errorMessage}>{showError && error}</div>
      )}
    </div>
  )
}
