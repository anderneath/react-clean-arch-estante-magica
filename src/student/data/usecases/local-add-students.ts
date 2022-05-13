import { CacheStorage } from '@/app/data/protocols'
import { DomainError } from '@/app/domain/errors'
import { AddStudents } from '@/student/domain/usecases'

export class LocalAddStudents implements AddStudents {
  constructor(private readonly storage: CacheStorage) {}

  async add(params: AddStudents.Params): Promise<AddStudents.Response> {
    try {
      const classes = this.storage.read('classes') ?? []
      const schoolClass = classes.find(
        (c: any) => c.id === params.classId && c.account_id === params.accountId
      )
      if (!schoolClass) {
        throw DomainError.classNotFound
      }
      const students = this.storage.read('students') ?? []
      const classStudents = students.filter((student: any) => {
        return (
          params.classId === student.class_id &&
          params.accountId === student.account_id
        )
      })
      for (let i = classStudents.length - 1; i >= 0; i--) {
        for (let j = params.student_names.length - 1; j >= 0; j--) {
          if (classStudents[i].student_name === params.student_names[j]) {
            params.student_names.splice(j, 1)
          }
        }
      }
      const lastIndex = Number.parseInt(
        students[students.length - 1]?.id ?? '0'
      )
      const newStudents = []
      for (let i = 0; i < params.student_names.length; i++) {
        newStudents.push({
          id: (lastIndex + 1 + i).toString(),
          student_name: params.student_names[i],
          class_id: params.classId,
          account_id: params.accountId
        })
      }
      this.storage.write('students', students.concat(newStudents))
      return newStudents.map((student: any) => {
        return {
          id: student.id,
          name: student.student_name,
          classId: params.classId,
          accountId: params.accountId
        }
      })
    } catch (error) {
      throw error
    }
  }
}
