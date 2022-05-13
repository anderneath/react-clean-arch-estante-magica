import { HttpRequest, HttpResponse } from '@/app/data/protocols'

export interface HttpClient {
  request: (data: HttpRequest) => Promise<HttpResponse>
}
