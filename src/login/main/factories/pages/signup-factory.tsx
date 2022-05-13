import { CacheStorage, HttpClient } from '@/app/data/protocols'
import {
  makeLocalCreateAccount,
  makeSignUpValidation
} from '@/login/main/factories'
import { SignUpPage } from '@/login/presentation/signup'
import React from 'react'

type Props = {
  client: HttpClient
  storage: CacheStorage
}

export const MakeSignUpPage: React.FC<Props> = ({ client, storage }) => {
  return (
    <SignUpPage
      // createAccount={makeRemoteCreateAccount(props.client)}
      createAccount={makeLocalCreateAccount(storage)}
      validation={makeSignUpValidation()}
    />
  )
}
