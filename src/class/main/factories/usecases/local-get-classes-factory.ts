import { CacheStorage } from '@/app/data/protocols'
import { LocalGetClasses } from '@/class/data/usecases'
import { GetClasses } from '@/class/domain/usecases'

export const makeLocalGetClasses = (storage: CacheStorage): GetClasses => {
  return new LocalGetClasses(storage)
}
