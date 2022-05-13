import { HttpClient } from '@/app/data/protocols'
import { RemoteGetStudents } from '@/student/data/usecases'
import { GetStudents } from '@/student/domain/usecases'

export const makeRemoteGetStudents = (client: HttpClient): GetStudents => {
  const url = ''
  return new RemoteGetStudents(url, client)
}
