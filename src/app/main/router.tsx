import {
  makeAxiosHttpClient,
  makeLocalGetAccount,
  makeLocalGetClassGrades,
  makeLocalSetAccount,
  makeLocalStorageAdapter,
  MakeNotFoundPage,
  makeStrings
} from '@/app/main/factories'
import {
  AccountProvider,
  ClassGradesProvider,
  ModalProvider,
  PrivateRoute,
  StringsProvider
} from '@/app/main/proxies'
import { Routes } from '@/app/presentation/protocols'
import { MakeAddClassDialog, MakeListClassesPage } from '@/class/main/factories'
import { MakeLoginPage, MakeSignUpPage } from '@/login/main/factories'
import {
  MakeAddStudentsDialog,
  MakeListStudentsPage
} from '@/student/main/factories'
import React from 'react'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes as ReactRoutes
} from 'react-router-dom'
import { RecoilRoot } from 'recoil'

const Router: React.FC = () => {
  const storage = makeLocalStorageAdapter()
  const client = makeAxiosHttpClient()
  return (
    <StringsProvider strings={makeStrings(navigator.language)}>
      <ClassGradesProvider getClassGrades={makeLocalGetClassGrades()}>
        <AccountProvider
          getAccount={makeLocalGetAccount(storage)}
          setAccount={makeLocalSetAccount(storage)}
        >
          <RecoilRoot>
            <BrowserRouter>
              <ModalProvider>
                <ReactRoutes>
                  <Route
                    path={Routes.login}
                    element={
                      <MakeLoginPage client={client} storage={storage} />
                    }
                  />
                  <Route
                    path={Routes.signup}
                    element={
                      <MakeSignUpPage client={client} storage={storage} />
                    }
                  />
                  <Route path={Routes.home} element={<PrivateRoute />}>
                    <Route
                      path={Routes.home}
                      element={<Navigate to={Routes.listClasses} />}
                    />
                  </Route>
                  <Route path={Routes.listClasses} element={<PrivateRoute />}>
                    <Route
                      path={Routes.listClasses}
                      element={
                        <MakeListClassesPage
                          client={client}
                          storage={storage}
                        />
                      }
                    >
                      <Route
                        path={Routes.addClass}
                        element={
                          <MakeAddClassDialog
                            client={client}
                            storage={storage}
                          />
                        }
                      />
                      <Route
                        path="*"
                        element={
                          <MakeListStudentsPage
                            client={client}
                            storage={storage}
                          />
                        }
                      />
                    </Route>
                  </Route>
                  <Route
                    path={Routes.listStudents()}
                    element={<PrivateRoute />}
                  >
                    <Route
                      path={Routes.listStudents()}
                      element={
                        <MakeListStudentsPage
                          client={client}
                          storage={storage}
                        />
                      }
                    >
                      <Route
                        path={Routes.addStudents()}
                        element={
                          <MakeAddStudentsDialog
                            client={client}
                            storage={storage}
                          />
                        }
                      />
                    </Route>
                  </Route>
                  <Route path="*" element={<MakeNotFoundPage />} />
                </ReactRoutes>
              </ModalProvider>
            </BrowserRouter>
          </RecoilRoot>
        </AccountProvider>
      </ClassGradesProvider>
    </StringsProvider>
  )
}

export default Router
