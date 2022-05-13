import { DomainError } from '@/app/domain/errors'
import { GetClass } from '@/app/domain/usecases'
import { useAccount, useStrings } from '@/app/main/proxies'
import { Assets } from '@/app/presentation/assets'
import {
  Asset,
  Button,
  Header,
  Loading,
  Table,
  Text,
  TextType
} from '@/app/presentation/components'
import { useDomainErrorHandler } from '@/app/presentation/hooks'
import { Alignment, Colors, Routes } from '@/app/presentation/protocols'
import { ClassEntity } from '@/class/domain/entities'
import { GetStudents } from '@/student/domain/usecases'
import { State, Style } from '@/student/presentation/list'
import React, { useEffect, useMemo } from 'react'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useRecoilState, useResetRecoilState } from 'recoil'

type Props = {
  getStudents: GetStudents
  getClass: GetClass
}

export const ListStudentsPage: React.FC<Props> = ({
  getStudents,
  getClass
}: Props) => {
  const resetState = useResetRecoilState(State)
  const [state, setState] = useRecoilState(State)
  const handleDomainError = useDomainErrorHandler()
  const [account] = useAccount()
  const params = useParams()
  const navigate = useNavigate()
  const strings = useStrings()
  const location = useLocation()

  useEffect(() => resetState(), [])

  const loadData = async (schoolClass: ClassEntity) => {
    try {
      setState(old => ({
        ...old,
        isLoading: true
      }))
      // TODO remove this setTimeout when data is loaded from API
      await new Promise(f => setTimeout(f, 2000))
      schoolClass =
        schoolClass ??
        getClass.get({
          accountId: account.id,
          classId: params.classId
        })
      const students = await getStudents.get({
        accountId: account.id,
        classId: params.classId
      })
      setState(old => ({
        ...old,
        class: schoolClass,
        students: students.map(student => ({ student })),
        isLoading: false
      }))
    } catch (error) {
      if (error === DomainError.classNotFound) {
        navigate(Routes.listClasses)
      } else {
        setState(old => ({
          ...old,
          isLoading: false,
          class: undefined,
          students: [],
          error: handleDomainError(error)
        }))
      }
    }
  }

  useEffect(() => {
    let schoolClass = state.class
    if (location.state) {
      schoolClass = state.class ?? location.state['class']
      if (location.state['student']) {
        const students = [
          ...state.students,
          { student: location.state['student'] }
        ]
        setState(old => ({
          ...old,
          class: schoolClass,
          students
        }))
      }
      navigate(location.pathname, { replace: true })
      return
    }
    loadData(schoolClass)
  }, [location.state])

  const onAddClicked = (): void => {
    navigate(Routes.addStudents(params.classId))
  }

  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'student.id'
      },
      {
        Header: strings.student,
        accessor: 'student.name'
      }
    ],
    []
  )

  return (
    <>
      <div className={Style.contentWrap}>
        <Header
          title={state.class?.name}
          history={[{ label: strings.classes, route: Routes.listClasses }]}
        >
          <Button onClick={onAddClicked}>{strings.addStudents}</Button>
        </Header>
        {state.isLoading ? (
          <Loading />
        ) : state.students.length == 0 ? (
          <div className={Style.studentsNotFoundWrap}>
            <Asset src={Assets.studentsNotFound} align={Alignment.center} />
            <div>
              <Text type={TextType.H2} color={Colors.blackD}>
                {strings.noStudentsFound}
              </Text>
              <Text type={TextType.H4} color={Colors.blackML}>
                {strings.registerYourStudentsNow}
              </Text>
              <div className={Style.noStudentButton}>
                <Button onClick={onAddClicked}>{strings.addStudents}</Button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <Table key={1} columns={columns} data={state.students} />
          </div>
        )}
      </div>
      <Outlet />
    </>
  )
}
