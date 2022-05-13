import { CacheStorage } from '@/app/data/protocols'
import { GetAccount } from '@/app/domain/usecases'

export class LocalGetAccount implements GetAccount {
  constructor(private readonly storage: CacheStorage) {}

  get(): GetAccount.Response {
    try {
      return this.storage.read('account')
    } catch (error) {
      return undefined
    }
  }
}
