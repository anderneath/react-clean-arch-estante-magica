import { FieldStyle as Style } from '@/app/presentation/components/fields'
import colors from '@/app/presentation/styles/colors.scss'
import React from 'react'
import Select from 'react-select'

type OptionSelect = {
  value?: string
  options?: OptionSelect[]
  label: any
}

type Props = {
  state: any
  setState: any
  placeholder?: any
  label?: any
  options?: OptionSelect[]
  name: string
  labelHidden?: boolean
  errorHidden?: boolean
  disabled?: boolean
  isSearchable?: boolean
}

const SelectField: React.FC<Props> = ({
  placeholder,
  options,
  label,
  state,
  setState,
  name,
  labelHidden = false,
  errorHidden = false,
  disabled = false,
  isSearchable = true
}) => {
  const { showError, isLoading } = state
  const error = state[`${name}Error`]
  const customStyles = {
    control: (provided: any, optState: any) => {
      const dBorderColor = showError && error ? colors.error : colors.grayML
      const borderColor = showError && error ? colors.error : colors.blueM
      return {
        ...provided,
        backgroundColor: optState.isDisabled ? colors.grayML : colors.grayL,
        border: `0.0625rem solid ${dBorderColor}`,
        fontFamily: `'Source Sans Pro', sans-serif`,
        fontSize: '0.875rem',
        height: '2.858rem',
        color: colors.blackM,
        pointerEvents: 'auto',
        cursor: optState.isDisabled ? 'not-allowed' : 'pointer',
        caretColor: 'transparent',
        borderRadius: '0.25rem',
        placeholder: {},
        '&:focus-within': {
          border: `0.0625rem solid ${borderColor}`,
          boxShadow: `0 0 0 0.0625rem ${borderColor}`
        },
        '&:hover': {
          border: `0.0625rem solid ${
            optState.isDisabled ? colors.grayML : borderColor
          }`
        }
      }
    },
    singleValue: (provided: any) => {
      return {
        ...provided,
        fontSize: '0.875rem'
      }
    },
    placeholder: (provided: any) => {
      return {
        ...provided,
        margin: 0,
        color: colors.blackL,
        fontSize: '0.875rem'
      }
    },
    menu: (provided: any) => {
      return {
        ...provided,
        overflow: 'hidden'
      }
    },
    option: (base: any, optState: any) => {
      return {
        ...base,
        display: 'flex',
        alignItems: 'center',
        fontFamily: `'Source Sans Pro', sans-serif`,
        fontSize: '0.875rem',
        height: '2.858rem',
        fontWeight: optState.isSelected ? '600' : 'normal',
        color: colors.blackM,
        cursor: 'pointer',
        backgroundColor: optState.isSelected
          ? `${colors.blueL}33`
          : 'transparent',
        '&:hover': {
          background: `${colors.blueM}33`
        }
      }
    }
  }
  return (
    <>
      <div className={Style.inputContainer}>
        {!labelHidden && <label htmlFor={Style.inputWrap}>{label}</label>}
        <Select
          options={options}
          styles={customStyles}
          classNamePrefix={Style.selectWrap}
          isSearchable={isSearchable}
          data-status={
            showError && error
              ? 'invalid'
              : (isLoading || disabled) && 'disabled'
          }
          placeholder={placeholder}
          components={{
            IndicatorSeparator: () => null
          }}
          onChange={e => setState({ ...state, [`${name}`]: e.value })}
          isDisabled={isLoading || disabled}
        />
        {!errorHidden && (
          <div className={Style.errorMessage}>{showError && error}</div>
        )}
      </div>
    </>
  )
}

export { OptionSelect, SelectField }
