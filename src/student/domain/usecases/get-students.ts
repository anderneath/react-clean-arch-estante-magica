import { StudentEntity } from '@/student/domain/entities'

export interface GetStudents {
  get: (params: GetStudents.Params) => Promise<GetStudents.Response>
}

export namespace GetStudents {
  export type Params = {
    accountId: string
    classId: string
  }
  export type Response = StudentEntity[]
}
