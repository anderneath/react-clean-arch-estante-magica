import { CacheStorage } from '@/app/data/protocols'
import { DomainError } from '@/app/domain/errors'
import { GetStudents } from '@/student/domain/usecases'

export class LocalGetStudents implements GetStudents {
  constructor(private readonly storage: CacheStorage) {}

  async get(params: GetStudents.Params): Promise<GetStudents.Response> {
    try {
      const classes = this.storage.read('classes') ?? []
      const schoolClass = classes.find(
        (c: any) => c.id === params.classId && c.account_id === params.accountId
      )
      if (!schoolClass) {
        throw DomainError.classNotFound
      }
      const students = this.storage.read('students') ?? []
      return students
        .filter(
          (c: any) =>
            params.accountId === c.account_id && params.classId === c.class_id
        )
        .map((student: any) => ({
          id: student.id,
          name: student.student_name,
          classId: student.class_id,
          accountId: student.account_id
        }))
    } catch (error) {
      throw error
    }
  }
}
