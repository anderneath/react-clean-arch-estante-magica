import { CacheStorage } from '@/app/data/protocols'
import { GetClass } from '@/app/domain/usecases'

export class LocalGetClass implements GetClass {
  constructor(private readonly storage: CacheStorage) {}

  get(params: GetClass.Params): GetClass.Response {
    try {
      const classes = this.storage.read('classes') ?? []
      const schoolClass = classes.find(
        (c: any) => c.id === params.classId && c.account_id === params.accountId
      )
      return (
        schoolClass && {
          id: schoolClass.id,
          name: schoolClass.class_name,
          grade: schoolClass.class_grade,
          teacherName: schoolClass.class_teacher,
          accountId: schoolClass.account_id
        }
      )
    } catch (error) {
      return undefined
    }
  }
}
