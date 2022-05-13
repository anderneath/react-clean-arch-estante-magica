import {
  HttpClient,
  HttpMethod,
  HttpStatusCode
} from '@/app/data/protocols/http'
import { DomainError } from '@/app/domain/errors'
import { CreateAccount } from '@/login/domain/usecases'

export class RemoteCreateAccount implements CreateAccount {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  async create(params: CreateAccount.Params): Promise<CreateAccount.Response> {
    const { statusCode, body } = await this.httpClient.request({
      url: this.url,
      method: HttpMethod.post,
      body: params
    })
    switch (statusCode) {
      case HttpStatusCode.ok:
        return body
      case HttpStatusCode.forbidden:
        throw DomainError.emailAlreadyFound
      default:
        throw DomainError.unexpected
    }
  }
}
