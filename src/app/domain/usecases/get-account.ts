import { AccountEntity } from '@/app/domain/entities'

export interface GetAccount {
  get: () => GetAccount.Response
}

export namespace GetAccount {
  export type Response = AccountEntity
}
