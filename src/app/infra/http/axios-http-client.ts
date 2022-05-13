import {
  HttpClient,
  HttpRequest,
  HttpResponse
} from '@/app/data/protocols/http'
import axios, { AxiosResponse } from 'axios'

export class AxiosHttpClient implements HttpClient {
  async request(data: HttpRequest): Promise<HttpResponse> {
    let response: AxiosResponse
    try {
      response = await axios.request({
        url: data.url,
        method: data.method,
        data: data.body,
        headers: data.headers
      })
    } catch (error) {
      response = error.response
    }
    return {
      statusCode: response?.status ?? 500,
      body: response?.data
    }
  }
}
