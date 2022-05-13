import { useAccount, useClassGrades, useStrings } from '@/app/main/proxies'
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  SelectField,
  Text,
  TextField,
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
import { AddClass } from '@/class/domain/usecases'
import { State, Style } from '@/class/presentation/add'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState, useResetRecoilState } from 'recoil'

enum Fields {
  name = 'name',
  grade = 'grade',
  teacherName = 'teacherName'
}

type Props = {
  validation: Validation
  addClass: AddClass
}

export const AddClassDialog: React.FC<Props> = ({
  validation,
  addClass
}: Props) => {
  const resetState = useResetRecoilState(State)
  const [state, setState] = useRecoilState(State)
  const handleDomainError = useDomainErrorHandler()
  const handleFormError = useFormErrorHandler()
  const [account] = useAccount()
  const navigate = useNavigate()
  const strings = useStrings()
  const classGrades = useClassGrades()

  useEffect(() => resetState(), [])

  const validate = (field: string): void => {
    const error = validation.validate(field, state[field])
    let errorMessage: string
    switch (error) {
      case FormError.minLengthRequired:
        errorMessage = strings.minLengthRequired(3)
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
      const schoolClass = await addClass.add({
        class_name: state.name,
        class_grade: state.grade,
        class_teacher: state.teacherName,
        account_id: account.id
      })
      navigate(Routes.listClasses, {
        replace: true,
        state: { class: schoolClass }
      })
    } catch (error) {
      setState(old => ({
        ...old,
        isLoading: false,
        error: handleDomainError(error)
      }))
    }
  }

  const onCloseClicked = () => navigate(Routes.listClasses, { replace: true })

  return (
    <Dialog>
      <DialogTitle onCloseClick={onCloseClicked}>
        <Text
          type={TextType.bodyL}
          transform={TextTransform.uppercase}
          style={TextStyle.bold}
          color={Colors.blackM}
        >
          {strings.addClass}
        </Text>
      </DialogTitle>
      <DialogContent className={Style.content}>
        <TextField
          name={Fields.name}
          label={strings.className}
          placeholder={strings.classNamePlaceholder}
          maxLength={30}
          state={state}
          setState={setState}
        />
        <SelectField
          name={Fields.grade}
          label={strings.grade}
          placeholder={strings.selectEllipsis}
          state={state}
          setState={setState}
          isSearchable={false}
          options={classGrades[strings.locale]?.map((grade: string) => ({
            label: grade,
            value: grade
          }))}
        />
        <TextField
          name={Fields.teacherName}
          label={strings.teacherName}
          placeholder={strings.fullName}
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
