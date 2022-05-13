import { HttpClient } from '@/app/data/protocols'
import { makeApiUrl } from '@/app/main/factories'
import { RemoteAuthenticate } from '@/login/data/usecases'
import { Authenticate } from '@/login/domain/usecases'

export const makeRemoteAuthenticate = (client: HttpClient): Authenticate => {
  return new RemoteAuthenticate(makeApiUrl('/auth'), client)
}
