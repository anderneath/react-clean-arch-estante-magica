import { CacheStorage, HttpClient } from '@/app/data/protocols'
import { makeLocalGetClasses } from '@/class/main/factories'
import { ListClassesPage } from '@/class/presentation/list'
import React from 'react'

type Props = {
  client: HttpClient
  storage: CacheStorage
}

export const MakeListClassesPage: React.FC<Props> = ({ client, storage }) => {
  return (
    <ListClassesPage
      // TODO as this project doesn't have a backend yet a choose to load
      // the data from local storage but you can create an API and change the
      // use case factory here:
      // getClasses={makeRemoteGetClasses(client)
      getClasses={makeLocalGetClasses(storage)}
    />
  )
}
