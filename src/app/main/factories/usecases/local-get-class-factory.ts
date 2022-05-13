import { CacheStorage } from '@/app/data/protocols'
import { LocalGetClass } from '@/app/data/usecases'
import { GetClass } from '@/app/domain/usecases'

export const makeLocalGetClass = (storage: CacheStorage): GetClass => {
  return new LocalGetClass(storage)
}
