import { CacheStorage } from '@/app/data/protocols'
import { DomainError } from '@/app/domain/errors'
import { GetClasses } from '@/class/domain/usecases'

export class LocalGetClasses implements GetClasses {
  constructor(private readonly storage: CacheStorage) {}

  async get(params: GetClasses.Params): Promise<GetClasses.Response> {
    try {
      const classes = this.storage.read('classes')
      return classes
        .filter((c: any) => params.accountId === c.account_id)
        .map((schoolClass: any) => {
          return {
            id: schoolClass.id,
            name: schoolClass.class_name,
            grade: schoolClass.class_grade,
            teacherName: schoolClass.class_teacher,
            accountId: schoolClass.account_id
          }
        })
    } catch {
      throw DomainError.unexpected
    }
  }
}
