import { LocalGetClassGrades } from '@/app/data/usecases'
import { GetClassGrades } from '@/app/domain/usecases'

export const makeLocalGetClassGrades = (): GetClassGrades => {
  return new LocalGetClassGrades()
}
