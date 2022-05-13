import { CacheStorage, HttpClient } from '@/app/data/protocols'
import {
  makeLocalAuthenticate,
  makeLoginValidation
} from '@/login/main/factories'
import { LoginPage } from '@/login/presentation/login'
import React from 'react'

type Props = {
  client: HttpClient
  storage: CacheStorage
}

export const MakeLoginPage: React.FC<Props> = ({ client, storage }) => {
  return (
    <LoginPage
      // authenticate={makeRemoteAuthenticate(props.client)}
      authenticate={makeLocalAuthenticate(storage)}
      validation={makeLoginValidation()}
    />
  )
}
