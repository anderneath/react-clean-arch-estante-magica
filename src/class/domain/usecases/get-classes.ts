import { ClassEntity } from '@/class/domain/entities'

export interface GetClasses {
  get: (params: GetClasses.Params) => Promise<GetClasses.Response>
}

export namespace GetClasses {
  export type Params = { accountId: string }

  export type Response = ClassEntity[]
}
