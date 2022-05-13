import { HttpMethod } from '@/app/data/protocols'

export type HttpRequest = {
  url: any
  method: HttpMethod
  body?: any
  headers?: any
  authorization?: string
}
