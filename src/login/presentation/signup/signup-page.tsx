import { useAccount, useStrings } from '@/app/main/proxies'
import { Assets } from '@/app/presentation/assets'
import {
  Asset,
  Button,
  PasswordField,
  Text,
  TextField,
  TextType,
  Tip
} from '@/app/presentation/components'
import {
  useDomainErrorHandler,
  useFormErrorHandler
} from '@/app/presentation/hooks'
import {
  Alignment,
  Colors,
  Routes,
  Validation
} from '@/app/presentation/protocols'
import { CreateAccount } from '@/login/domain/usecases'
import { State, Style } from '@/login/presentation/signup'
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRecoilState, useResetRecoilState } from 'recoil'

enum Fields {
  name = 'name',
  email = 'email',
  password = 'password',
  passwordConfirmation = 'passwordConfirmation'
}

type Props = {
  validation: Validation
  createAccount: CreateAccount
}

export const SignUpPage: React.FC<Props> = ({
  validation,
  createAccount
}: Props) => {
  const resetState = useResetRecoilState(State)
  const [state, setState] = useRecoilState(State)
  const [, setAccount] = useAccount()
  const handleDomainError = useDomainErrorHandler()
  const handleFormError = useFormErrorHandler()
  const navigate = useNavigate()
  const strings = useStrings()

  useEffect(() => resetState(), [])

  const validate = (field: string): void => {
    const error = validation.validate(field, state[field])
    let errorMessage = error && handleFormError(error)
    if (
      field === Fields.passwordConfirmation &&
      !error &&
      state.password !== state.passwordConfirmation
    ) {
      errorMessage = strings.passwordsDontMatch
    }
    setState(old => ({
      ...old,
      [`${field}Error`]: errorMessage
    }))
  }

  for (const field of Object.values(Fields)) {
    useEffect(() => validate(field), [state[field]])
  }

  const formHasErrors = (): boolean => {
    return Object.values(Fields).some(field => !!state[`${field}Error`])
  }

  const onSignUpClicked = async (
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
      if (hasErrors) {
        return
      }
      setState(old => ({
        ...old,
        isLoading: true
      }))
      const account = await createAccount.create({
        first_name: state.name.split(' ')[0],
        last_name: state.name.substring(state.name.indexOf(' ') + 1),
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
      <form className={Style.form} onSubmit={onSignUpClicked}>
        <Asset src={Assets.logoCloud} align={Alignment.center} />
        <TextField
          name={Fields.name}
          label={strings.name}
          placeholder={strings.typeYourName}
          state={state}
          setState={setState}
        />
        <TextField
          type="email"
          label={strings.email}
          name={Fields.email}
          placeholder={strings.typeYourEmail}
          state={state}
          setState={setState}
        />
        <PasswordField
          label={strings.createYourPassword}
          name={Fields.password}
          placeholder={strings.typeYourPassword}
          state={state}
          setState={setState}
        />
        <TextField
          type={state.showPassword ? 'text' : 'password'}
          label={strings.confirmYourPassword}
          name={Fields.passwordConfirmation}
          placeholder={strings.repeatYourPassword}
          state={state}
          setState={setState}
        />
        {state.error && (
          <Tip className={Style.tip} color={Colors.error}>
            <Text type={TextType.bodyS} color={Colors.white}>
              {state.error}
            </Text>
          </Tip>
        )}
        <Button type="submit" isLoading={state.isLoading}>
          {strings.signIn}
        </Button>
        <Text type={TextType.bodyS} className={Style.action}>
          <span>{strings.alreadyHaveAccount} </span>
          <Link to={Routes.login} replace={true}>
            {strings.login}
          </Link>
        </Text>
      </form>
    </div>
  )
}
