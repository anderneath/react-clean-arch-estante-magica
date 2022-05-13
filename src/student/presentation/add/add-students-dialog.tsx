import { useAccount, useStrings } from '@/app/main/proxies'
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  Text,
  TextAreaField,
  TextStyle,
  TextTransform,
  TextType,
  Tip
} from '@/app/presentation/components'
import {
  useDomainErrorHandler,
  useFormErrorHandler
} from '@/app/presentation/hooks'
import {
  ButtonVariant,
  Colors,
  Routes,
  Validation
} from '@/app/presentation/protocols'
import { FormError } from '@/app/validation/errors'
import { AddStudents } from '@/student/domain/usecases'
import { State, Style } from '@/student/presentation/add'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useRecoilState, useResetRecoilState } from 'recoil'

enum Fields {
  names = 'names'
}

type Props = {
  validation: Validation
  addStudents: AddStudents
}

export const AddStudentsDialog: React.FC<Props> = ({
  validation,
  addStudents
}: Props) => {
  const resetState = useResetRecoilState(State)
  const [state, setState] = useRecoilState(State)
  const handleDomainError = useDomainErrorHandler()
  const handleFormError = useFormErrorHandler()
  const [account] = useAccount()
  const params = useParams()
  const navigate = useNavigate()
  const strings = useStrings()

  useEffect(() => resetState(), [])

  const validate = (field: string): void => {
    const error = validation.validate(field, state[field])
    let errorMessage: string
    switch (error) {
      case FormError.fullNameRequired:
        errorMessage = strings.studentsFullNameRequired
        break
      default:
        errorMessage = error && handleFormError(error)
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

  const onAddClicked = async (): Promise<void> => {
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
    try {
      const students = await addStudents.add({
        accountId: account.id,
        classId: params.classId,
        student_names: state.names
          .split('\n')
          .map((name: string) => name.trim())
          .filter((name: string) => !!name)
      })
      navigate(Routes.listStudents(params.classId), {
        replace: true,
        state: { students }
      })
    } catch (error) {
      setState(old => ({
        ...old,
        isLoading: false,
        error: handleDomainError(error)
      }))
    }
  }

  const onCloseClicked = () => {
    navigate(Routes.listStudents(params.classId), { replace: true })
  }

  return (
    <Dialog>
      <DialogTitle onCloseClick={onCloseClicked}>
        <Text
          type={TextType.bodyL}
          transform={TextTransform.uppercase}
          style={TextStyle.bold}
          color={Colors.blackM}
        >
          {strings.addStudents}
        </Text>
      </DialogTitle>
      <DialogContent className={Style.content}>
        <TextAreaField
          name={Fields.names}
          label={strings.studentsNames}
          placeholder={strings.studentsNamesPlaceholder}
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
      </DialogContent>
      <DialogFooter>
        <Button variant={ButtonVariant.secondary} onClick={onCloseClicked}>
          {strings.cancel}
        </Button>
        <Button onClick={onAddClicked}>{strings.add}</Button>
      </DialogFooter>
    </Dialog>
  )
}
