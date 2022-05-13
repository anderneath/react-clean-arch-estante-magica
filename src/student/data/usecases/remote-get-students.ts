import { HttpClient, HttpMethod, HttpStatusCode } from '@/app/data/protocols'
import { DomainError } from '@/app/domain/errors'
import { GetStudents } from '@/student/domain/usecases'

export class RemoteGetStudents implements GetStudents {
  constructor(private readonly url: any, private readonly client: HttpClient) {}

  async get(): Promise<GetStudents.Response> {
    const { statusCode, body } = await this.client.request({
      url: this.url,
      method: HttpMethod.get
    })
    switch (statusCode) {
      case HttpStatusCode.ok:
        return body?.map((c: any) => {
          return {
            id: c.student_id,
            name: c.student_name
          }
        })
      case HttpStatusCode.unauthorized:
        throw DomainError.unauthenticated
      default:
        throw DomainError.unexpected
    }
  }
}
