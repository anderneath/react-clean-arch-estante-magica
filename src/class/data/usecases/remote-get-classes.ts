import { HttpClient, HttpMethod, HttpStatusCode } from '@/app/data/protocols'
import { DomainError } from '@/app/domain/errors'
import { GetClasses } from '@/class/domain/usecases'

export class RemoteGetClasses implements GetClasses {
  constructor(private readonly url: any, private readonly client: HttpClient) {}

  async get(): Promise<GetClasses.Response> {
    const { statusCode, body } = await this.client.request({
      url: this.url,
      method: HttpMethod.get
    })
    switch (statusCode) {
      case HttpStatusCode.ok:
        return body?.map((c: any) => {
          return {
            id: c.id,
            name: c.class_name,
            grade: c.class_grade,
            teacherName: c.class_teacher
          }
        })
      case HttpStatusCode.unauthorized:
        throw DomainError.unauthenticated
      default:
        throw DomainError.unexpected
    }
  }
}
