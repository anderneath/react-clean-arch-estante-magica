import { CacheStorage } from '@/app/data/protocols'
import { LocalAddStudents as LocalAddStudents } from '@/student/data/usecases'
import { AddStudents } from '@/student/domain/usecases'

export const makeLocalAddStudents = (storage: CacheStorage): AddStudents => {
  return new LocalAddStudents(storage)
}
