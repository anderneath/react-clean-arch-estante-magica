import { CacheStorage } from '@/app/data/protocols'
import { SetAccount } from '@/app/domain/usecases'

export class LocalSetAccount implements SetAccount {
  constructor(private readonly storage: CacheStorage) {}

  set(params: SetAccount.Params): void {
    try {
      this.storage.write('account', params)
    } catch (error) {
      return undefined
    }
  }
}
