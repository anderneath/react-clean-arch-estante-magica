import { CacheStorage } from '@/app/data/protocols'
import { LocalSetAccount } from '@/app/data/usecases'
import { SetAccount } from '@/app/domain/usecases'

export const makeLocalSetAccount = (storage: CacheStorage): SetAccount => {
  return new LocalSetAccount(storage)
}
