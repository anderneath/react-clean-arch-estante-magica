import { FormError } from '@/app/validation/errors'

export interface FieldValidator {
  field: string
  validate: (value: any) => FormError
}
