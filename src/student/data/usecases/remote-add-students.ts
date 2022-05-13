import { HttpClient, HttpMethod, HttpStatusCode } from '@/app/data/protocols'
import { DomainError } from '@/app/domain/errors'
import { AddStudents } from '@/student/domain/usecases'

export class RemoteAddStudents implements AddStudents {
  constructor(private readonly url: any, private readonly client: HttpClient) {}

  async add(params: AddStudents.Params): Promise<AddStudents.Response> {
    const { statusCode, body } = await this.client.request({
      url: this.url,
      method: HttpMethod.post,
      body: params
    })
    switch (statusCode) {
      case HttpStatusCode.ok:
        return body?.map((student: any) => ({
          id: student.student_id,
          name: student.student_name
        }))
      case HttpStatusCode.unauthorized:
        throw DomainError.unauthenticated
      default:
        throw DomainError.unauthenticated
    }
  }
}
