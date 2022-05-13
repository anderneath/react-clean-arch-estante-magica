import { ClassEntity } from '@/class/domain/entities'

export interface GetClass {
  get: (params: GetClass.Params) => GetClass.Response
}

export namespace GetClass {
  export type Params = {
    accountId: string
    classId: string
  }

  export type Response = ClassEntity
}
