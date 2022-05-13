import { CacheStorage } from '@/app/data/protocols'
import { AccountEntity } from '@/app/domain/entities'
import { DomainError } from '@/app/domain/errors'
import { CreateAccount } from '@/login/domain/usecases'

export class LocalCreateAccount implements CreateAccount {
  constructor(private readonly storage: CacheStorage) {}

  create(params: CreateAccount.Params): Promise<AccountEntity> {
    try {
      const accounts = this.storage.read('accounts') ?? []
      const found = accounts?.find((account: any) => {
        return account.email === params.email
      })
      if (found) {
        throw DomainError.emailAlreadyFound
      }
      const lastIndex = Number.parseInt(
        accounts[accounts.length - 1]?.id ?? '0'
      )
      const account = {
        id: (lastIndex + 1).toString(),
        ...params
      }
      accounts.push(account)
      this.storage.write('accounts', accounts)
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
