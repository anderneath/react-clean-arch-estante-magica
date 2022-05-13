import { CacheStorage } from '@/app/data/protocols'
import { LocalAuthenticate } from '@/login/data/usecases'
import { Authenticate } from '@/login/domain/usecases'

export const makeLocalAuthenticate = (storage: CacheStorage): Authenticate => {
  return new LocalAuthenticate(storage)
}
