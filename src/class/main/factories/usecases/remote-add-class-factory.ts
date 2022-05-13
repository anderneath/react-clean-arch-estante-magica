import { HttpClient } from '@/app/data/protocols'
import { RemoteAddClass } from '@/class/data/usecases'
import { AddClass } from '@/class/domain/usecases'

export const makeRemoteAddClass = (client: HttpClient): AddClass => {
  const url = ''
  return new RemoteAddClass(url, client)
}
