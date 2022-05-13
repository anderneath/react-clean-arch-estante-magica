import { HttpClient } from '@/app/data/protocols'
import { makeApiUrl } from '@/app/main/factories'
import { RemoteCreateAccount } from '@/login/data/usecases'
import { CreateAccount } from '@/login/domain/usecases'

export const makeRemoteCreateAccount = (client: HttpClient): CreateAccount => {
  return new RemoteCreateAccount(makeApiUrl('/signup'), client)
}
