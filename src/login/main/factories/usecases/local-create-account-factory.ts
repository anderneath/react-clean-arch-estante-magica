import { CacheStorage } from '@/app/data/protocols'
import { LocalCreateAccount } from '@/login/data/usecases'
import { CreateAccount } from '@/login/domain/usecases'

export const makeLocalCreateAccount = (
  storage: CacheStorage
): CreateAccount => {
  return new LocalCreateAccount(storage)
}
