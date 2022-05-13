import { CacheStorage } from '@/app/data/protocols'
import { AccountEntity } from '@/app/domain/entities'
import { DomainError } from '@/app/domain/errors'
import { Authenticate } from '@/login/domain/usecases'

export class LocalAuthenticate implements Authenticate {
  constructor(private readonly storage: CacheStorage) {}

  auth(params: Authenticate.Params): Promise<AccountEntity> {
    try {
      const accounts = this.storage.read('accounts') ?? []
      const account = accounts?.find((account: any) => {
        return (
          account.email === params.email && account.password === params.password
        )
      })
      if (!account) {
        throw DomainError.invalidCredentials
      }
      // TODO remove these fake tokens and receive it from backend
      const timestamp = new Date().getTime().toString()
      return Promise.resolve({
        id: account.id,
        firstName: account.first_name,
        lastName: account.last_name,
        email: account.email,
        accessToken: timestamp,
        refreshToken: timestamp
      })
    } catch (error) {
      throw error
    }
  }
}
