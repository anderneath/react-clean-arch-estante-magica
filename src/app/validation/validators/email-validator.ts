import { FormError } from '@/app/validation/errors'
import { FieldValidator } from '@/app/validation/protocols'

export class EmailValidator implements FieldValidator {
  constructor(readonly field: string) {}

  validate(value: any): FormError {
    const emailRegex =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    return !value || emailRegex.test(value) ? undefined : FormError.invalidEmail
  }
}
