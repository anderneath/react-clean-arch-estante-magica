import { useAccount, useStrings } from '@/app/main/proxies'
import { Assets } from '@/app/presentation/assets'
import {
  Asset,
  Button,
  PasswordField,
  Text,
  TextField,
  TextType
} from '@/app/presentation/components'
import {
  useDomainErrorHandler,
  useFormErrorHandler
} from '@/app/presentation/hooks'
import { Alignment, Routes, Validation } from '@/app/presentation/protocols'
import { Authenticate } from '@/login/domain/usecases'
import { State, Style } from '@/login/presentation/login'
import { LockOpen, PersonOutline } from '@mui/icons-material'
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRecoilState, useResetRecoilState } from 'recoil'

enum Fields {
  email = 'email',
  password = 'password'
}

type Props = {
  validation: Validation
  authenticate: Authenticate
}

export const LoginPage: React.FC<Props> = ({
  validation,
  authenticate
}: Props) => {
  const resetState = useResetRecoilState(State)
  const [state, setState] = useRecoilState(State)
  const [_, setAccount] = useAccount()
  const handleDomainError = useDomainErrorHandler()
  const handleFormError = useFormErrorHandler()
  const navigate = useNavigate()
  const strings = useStrings()

  useEffect(() => resetState(), [])

  const validate = (field: string): void => {
    const error = validation.validate(field, state[field])
    setState(old => ({
      ...old,
      error: undefined,
      [`${field}Error`]: error && handleFormError(error)
    }))
  }

  for (const field of Object.values(Fields)) {
    useEffect(() => validate(field), [state[field]])
  }

  const formHasErrors = (): boolean => {
    return Object.values(Fields).some(field => !!state[`${field}Error`])
  }

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()
    try {
      setState(old => ({
        ...old,
        error: undefined,
        showError: true
      }))
      const hasErrors = formHasErrors()
      if (hasErrors || state.isLoading) {
        return
      }
      setState(old => ({ ...old, isLoading: true }))
      const account = await authenticate.auth({
        email: state.email,
        password: state.password
      })
      setAccount(account)
      navigate(Routes.listClasses)
    } catch (error) {
      setState(old => ({
        ...old,
        isLoading: false,
        error: handleDomainError(error)
      }))
    }
  }

  return (
    <div className={Style.formWrap}>
      <form className={Style.form} onSubmit={handleSubmit} noValidate>
        <Asset src={Assets.logoCloud} align={Alignment.center} />
        <TextField
          type="email"
          name={Fields.email}
          label={strings.email}
          placeholder={strings.typeYourEmail}
          prefixIcon={<PersonOutline />}
          state={state}
          setState={setState}
        />
        <PasswordField
          name={Fields.password}
          label={strings.password}
          placeholder={strings.typeYourPassword}
          prefixIcon={<LockOpen />}
          state={state}
          setState={setState}
          error={state.error}
        />
        <Button type="submit" isLoading={state.isLoading}>
          {strings.login}
        </Button>
        <Text type={TextType.bodyS} className={Style.action}>
          <span>{strings.firstAccess} </span>
          <Link to={Routes.signup} replace={true}>
            {strings.signup}
          </Link>
        </Text>
      </form>
    </div>
  )
}
