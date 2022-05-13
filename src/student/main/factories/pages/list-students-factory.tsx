import { CacheStorage, HttpClient } from '@/app/data/protocols'
import { makeLocalGetClass } from '@/app/main/factories'
import { makeLocalGetStudents } from '@/student/main/factories'
import { ListStudentsPage } from '@/student/presentation/list'
import React from 'react'

type Props = {
  client: HttpClient
  storage: CacheStorage
}

export const MakeListStudentsPage: React.FC<Props> = ({ client, storage }) => {
  return (
    <ListStudentsPage
      // TODO as this project doesn't have a backend yet a choose to load
      // the data from local storage but you can create an API and change the
      // use case factory here:
      // getStudents={makeRemoteGetStudents(client)
      getStudents={makeLocalGetStudents(storage)}
      getClass={makeLocalGetClass(storage)}
    />
  )
}
