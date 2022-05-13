import { CacheStorage, HttpClient } from '@/app/data/protocols'
import {
  makeAddStudentsValidation,
  makeLocalAddStudents
} from '@/student/main/factories'
import { AddStudentsDialog } from '@/student/presentation/add'
import React from 'react'

type Props = {
  client: HttpClient
  storage: CacheStorage
}

export const MakeAddStudentsDialog: React.FC<Props> = ({ client, storage }) => {
  return (
    <AddStudentsDialog
      validation={makeAddStudentsValidation()}
      // TODO as this project doesn't have a backend yet a choose to persiste
      // the data on local storage but you can create an API and change the
      // use case factory here:
      // addStudents={makeRemoteAddStudents(client)}
      addStudents={makeLocalAddStudents(storage)}
    />
  )
}
