import { GetClassGrades } from '@/app/domain/usecases'

export class LocalGetClassGrades implements GetClassGrades {
  get(): GetClassGrades.Response {
    return {
      pt: [
        'Jardim/Pré I',
        'Jardim/Pré II',
        'Jardim/Pré III',
        '1º ano',
        '2º ano',
        '3º ano',
        '4º ano',
        '5º ano'
      ],
      es: [
        '1º Educación Preescolar',
        '2º Educación Preescolar',
        '3º Educación Preescolar',
        '1º Educación Primaria',
        '2º Educación Primaria',
        '3º Educación Primaria',
        '4º Educación Primaria',
        '5º Educación Primaria'
      ],
      en: [
        'Preschool',
        'Year 1',
        'Year 2',
        'Year 3',
        'Year 4',
        'Year 5',
        'Year 6'
      ]
    }
  }
}
