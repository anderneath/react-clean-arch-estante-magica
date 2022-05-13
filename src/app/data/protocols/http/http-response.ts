import { HttpStatusCode } from '@/app/data/protocols'

export type HttpResponse = {
  statusCode: HttpStatusCode
  body?: any
}
