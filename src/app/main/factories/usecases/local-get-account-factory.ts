import { CacheStorage } from '@/app/data/protocols'
import { LocalGetAccount } from '@/app/data/usecases'
import { GetAccount } from '@/app/domain/usecases'

export const makeLocalGetAccount = (storage: CacheStorage): GetAccount => {
  return new LocalGetAccount(storage)
}
