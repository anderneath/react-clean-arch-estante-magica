import { CacheStorage } from '@/app/data/protocols'
import { DomainError } from '@/app/domain/errors'
import { AddClass } from '@/class/domain/usecases'

export class LocalAddClass implements AddClass {
  constructor(private readonly storage: CacheStorage) {}

  async add(params: AddClass.Params): Promise<AddClass.Response> {
    try {
      const classes = this.storage.read('classes') ?? []
      const found = classes
        ?.filter((c: any) => c.account_id === params.account_id)
        .find((c: any) => c.class_name === params.class_name)
      if (found) {
        throw DomainError.classAlreadyExists
      }
      const lastIndex = Number.parseInt(classes[classes.length - 1]?.id ?? '0')
      const schoolClass = {
        id: (lastIndex + 1).toString(),
        ...params
      }
      classes.push(schoolClass)
      this.storage.write('classes', classes)
      return {
        id: schoolClass.id,
        name: schoolClass.class_name,
        grade: schoolClass.class_grade,
        teacherName: schoolClass.class_teacher,
        accountId: schoolClass.account_id
      }
    } catch (error) {
      throw error
    }
  }
}
