import { HttpClient, HttpMethod, HttpStatusCode } from '@/app/data/protocols'
import { DomainError } from '@/app/domain/errors'
import { AddClass } from '@/class/domain/usecases'

export class RemoteAddClass implements AddClass {
  constructor(private readonly url: any, private readonly client: HttpClient) {}

  async add(params: AddClass.Params): Promise<AddClass.Response> {
    const { statusCode, body } = await this.client.request({
      url: this.url,
      method: HttpMethod.post,
      body: params
    })
    switch (statusCode) {
      case HttpStatusCode.ok:
        return {
          id: body.class_id,
          name: params.class_name,
          grade: params.class_grade,
          teacherName: params.class_teacher,
          accountId: params.account_id
        }
      case HttpStatusCode.unauthorized:
        throw DomainError.unauthenticated
      case HttpStatusCode.forbidden:
        throw DomainError.classAlreadyExists
      default:
        throw DomainError.unauthenticated
    }
  }
}
