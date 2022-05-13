import { FormError } from '@/app/validation/errors'
import { FieldValidator } from '@/app/validation/protocols'

export class RequiredFieldValidator implements FieldValidator {
  constructor(readonly field: string) {}

  validate(value: any): FormError {
    return value ? undefined : FormError.requiredField
  }
}
