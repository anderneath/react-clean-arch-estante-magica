import {
  HttpClient,
  HttpMethod,
  HttpStatusCode
} from '@/app/data/protocols/http'
import { DomainError } from '@/app/domain/errors'
import { Authenticate } from '@/login/domain/usecases'

export class RemoteAuthenticate implements Authenticate {
  constructor(
    private readonly url: string,
    private readonly client: HttpClient
  ) {}

  async auth(params: Authenticate.Params): Promise<Authenticate.Response> {
    const {
      statusCode,
      body: { data }
    } = await this.client.request({
      url: this.url,
      method: HttpMethod.post,
      body: params
    })
    switch (statusCode) {
      case HttpStatusCode.ok:
        return data
      case HttpStatusCode.unauthorized:
        throw DomainError.invalidCredentials
      default:
        throw DomainError.unexpected
    }
  }
}
