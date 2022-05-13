import { StudentEntity } from '@/student/domain/entities'

export interface AddStudents {
  add: (params: AddStudents.Params) => Promise<AddStudents.Response>
}

export namespace AddStudents {
  export type Params = {
    student_names: string[]
    accountId: string
    classId: string
  }
  export type Response = StudentEntity[]
}
