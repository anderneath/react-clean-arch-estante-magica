import { CacheStorage } from '@/app/data/protocols'
import { LocalAddClass } from '@/class/data/usecases'
import { AddClass } from '@/class/domain/usecases'

export const makeLocalAddClass = (storage: CacheStorage): AddClass => {
  return new LocalAddClass(storage)
}
