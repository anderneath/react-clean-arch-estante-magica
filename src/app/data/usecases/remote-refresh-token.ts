import {
  HttpClient,
  HttpMethod,
  HttpStatusCode
} from '@/app/data/protocols/http'
import { DomainError } from '@/app/domain/errors'
import { RefreshToken } from '@/app/domain/usecases'

export class RemoteRefreshToken implements RefreshToken {
  constructor(private readonly url: any, private readonly client: HttpClient) {}

  async refresh(params: RefreshToken.Params): Promise<RefreshToken.Response> {
    const {
      statusCode,
      body: { access_token, refresh_token }
    } = await this.client.request({
      url: this.url,
      method: HttpMethod.post,
      headers: params
    })
    switch (statusCode) {
      case HttpStatusCode.ok:
        return { access_token, refresh_token }
      default:
        throw DomainError.unauthenticated
    }
  }
}
