import { AccountEntity } from '@/app/domain/entities'

export interface CreateAccount {
  create: (params: CreateAccount.Params) => Promise<CreateAccount.Response>
}

export namespace CreateAccount {
  export type Params = {
    first_name: string
    last_name: string
    email: string
    password: string
  }

  export type Response = AccountEntity
}
