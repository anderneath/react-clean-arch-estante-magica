import { CacheStorage } from '@/app/data/protocols'
import { LocalGetStudents } from '@/student/data/usecases'
import { GetStudents } from '@/student/domain/usecases'

export const makeLocalGetStudents = (storage: CacheStorage): GetStudents => {
  return new LocalGetStudents(storage)
}
