import { ClassEntity } from '@/class/domain/entities'

export interface AddClass {
  add: (params: AddClass.Params) => Promise<AddClass.Response>
}

export namespace AddClass {
  export type Params = {
    class_name: string
    class_grade: string
    class_teacher: string
    account_id: string
  }
  export type Response = ClassEntity
}
