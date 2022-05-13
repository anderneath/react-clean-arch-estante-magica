import { HttpClient } from '@/app/data/protocols'
import { RemoteAddStudents } from '@/student/data/usecases'
import { AddStudents } from '@/student/domain/usecases'

export const makeRemoteAddStudents = (client: HttpClient): AddStudents => {
  const url = ''
  return new RemoteAddStudents(url, client)
}
