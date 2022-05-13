import { FormError } from '@/app/validation/errors'

export interface Validation {
  validate: (fieldName: string, input: object) => FormError
}
