import { FieldStyle as Style } from '@/app/presentation/components/fields'
import React, { useRef } from 'react'

export type TextFieldProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  name: string
  state: any
  setState: any
  placeholder?: string
  label?: string
  prefixIcon?: JSX.Element
  suffixIcon?: JSX.Element
  labelHidden?: boolean
  errorHidden?: boolean
  error?: string
}

export const TextField: React.FC<TextFieldProps> = ({
  type = 'text',
  name,
  state,
  setState,
  label,
  placeholder,
  prefixIcon,
  suffixIcon,
  labelHidden = false,
  errorHidden = false,
  error,
  ...props
}: TextFieldProps) => {
  const inputRef = useRef<HTMLInputElement>()
  error = error ?? state[`${name}Error`]
  const { isLoading, showError } = state

  const handleOnFocus = (e: any): void => {
    e.target.readOnly = false
  }

  return (
    <div className={Style.inputContainer}>
      {!labelHidden && <label htmlFor={Style.inputWrap}>{label}</label>}
      <div
        className={Style.inputWrap}
        prefix-icon={`${!!prefixIcon}`}
        suffix-icon={`${!!suffixIcon}`}
        data-status={
          showError && error
            ? 'invalid'
            : isLoading || props.disabled
            ? 'disabled'
            : 'valid'
        }
        onClick={() => {
          inputRef.current.focus()
        }}
      >
        {prefixIcon}
        <input
          {...props}
          name={name}
          type={type}
          ref={inputRef}
          placeholder={placeholder}
          readOnly
          onFocus={handleOnFocus}
          onChange={e => {
            setState({ ...state, [e.target.name]: e.target.value })
          }}
          disabled={isLoading || props.disabled}
        />
        {suffixIcon}
      </div>
      {!errorHidden && (
        <div className={Style.errorMessage}>{showError && error}</div>
      )}
    </div>
  )
}
