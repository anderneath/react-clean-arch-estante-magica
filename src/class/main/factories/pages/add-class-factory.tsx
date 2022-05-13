import { CacheStorage, HttpClient } from '@/app/data/protocols'
import {
  makeAddClassValidation,
  makeLocalAddClass
} from '@/class/main/factories'
import { AddClassDialog } from '@/class/presentation/add'
import React from 'react'

type Props = {
  client: HttpClient
  storage: CacheStorage
}

export const MakeAddClassDialog: React.FC<Props> = ({ client, storage }) => {
  return (
    <AddClassDialog
      validation={makeAddClassValidation()}
      // TODO as this project doesn't have a backend yet a choose to persiste
      // the data on local storage but you can create an API and change the
      // use case factory here:
      // addClass={makeRemoteAddClass(client)}
      addClass={makeLocalAddClass(storage)}
    />
  )
}
