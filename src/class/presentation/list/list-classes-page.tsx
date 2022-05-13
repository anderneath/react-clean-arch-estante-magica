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
import { GetClasses } from '@/class/domain/usecases'
import { State, Style } from '@/class/presentation/list'
import React, { useEffect, useMemo } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useRecoilState, useResetRecoilState } from 'recoil'

type Props = {
  getClasses: GetClasses
}

export const ListClassesPage: React.FC<Props> = ({ getClasses }: Props) => {
  const resetState = useResetRecoilState(State)
  const [state, setState] = useRecoilState(State)
  const handleDomainError = useDomainErrorHandler()
  const [account] = useAccount()
  const navigate = useNavigate()
  const strings = useStrings()
  const location = useLocation()

  useEffect(() => {
    resetState()
    loadClasses()
  }, [])

  const loadClasses = async () => {
    try {
      setState(old => ({
        ...old,
        isLoading: true
      }))
      // TODO remove this setTimeout when data is loaded from API
      await new Promise(f => setTimeout(f, 2000))
      const classes = await getClasses.get({ accountId: account.id })
      setState(old => ({
        ...old,
        classes: classes.map(schoolClass => ({ class: schoolClass })),
        isLoading: false
      }))
    } catch (error) {
      setState(old => ({
        ...old,
        isLoading: false,
        classes: [],
        error: handleDomainError(error)
      }))
    }
  }

  useEffect(() => {
    if (location.state) {
      const classes = [...state.classes, location.state]
      setState(old => ({ ...old, classes }))
      navigate(location.pathname, { replace: true })
    }
  }, [location.state])

  const onAddClicked = (): void => {
    navigate(Routes.addClass)
  }

  const Actions = ({ cell: { value } }) => {
    return (
      <>
        <Button
          onClick={() => {
            return navigate(Routes.listStudents(value.id), {
              state: {
                class: value
              }
            })
          }}
        >
          {strings.listStudents}
        </Button>
      </>
    )
  }

  const columns = useMemo(
    () => [
      {
        Header: strings.name,
        accessor: 'class.name'
      },
      {
        Header: strings.grade,
        accessor: 'class.grade'
      },
      {
        Header: strings.teacher,
        accessor: 'class.teacherName'
      },
      {
        Header: strings.actions,
        accessor: 'class',
        Cell: Actions
      }
    ],
    []
  )

  return (
    <>
      <div className={Style.contentWrap}>
        <Header title={strings.classes}>
          <Button onClick={onAddClicked}>{strings.addClass}</Button>
        </Header>
        {state.isLoading ? (
          <Loading />
        ) : state.classes.length == 0 ? (
          <div className={Style.classesNotFoundWrap}>
            <Asset src={Assets.classesNotFound} align={Alignment.center} />
            <div>
              <Text type={TextType.H2} color={Colors.blackD}>
                {strings.noClassFound}
              </Text>
              <Text type={TextType.H4} color={Colors.blackML}>
                {strings.noClassFoundSubtitle}
              </Text>
              <div className={Style.noClassButton}>
                <Button onClick={onAddClicked}>{strings.addClass}</Button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <Table key={1} columns={columns} data={state.classes} />
          </div>
        )}
      </div>
      <Outlet />
    </>
  )
}
