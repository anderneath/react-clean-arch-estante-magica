import { AccountEntity } from '@/app/domain/entities'

export interface Authenticate {
  auth: (params: Authenticate.Params) => Promise<Authenticate.Response>
}

export namespace Authenticate {
  export type Params = {
    email: string
    password: string
  }
  export type Response = AccountEntity
}
