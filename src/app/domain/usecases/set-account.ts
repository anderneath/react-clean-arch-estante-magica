import { AccountEntity } from '@/app/domain/entities'

export interface SetAccount {
  set: (params: SetAccount.Params) => void
}

export namespace SetAccount {
  export type Params = AccountEntity
}
