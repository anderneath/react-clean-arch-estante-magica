import { HttpClient } from '@/app/data/protocols'
import { RemoteGetClasses } from '@/class/data/usecases'
import { GetClasses } from '@/class/domain/usecases'

export const makeRemoteGetClasses = (client: HttpClient): GetClasses => {
  const url = ''
  return new RemoteGetClasses(url, client)
}
