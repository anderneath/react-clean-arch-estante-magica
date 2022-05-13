import { FormError } from '@/app/validation/errors'
import { FieldValidator } from '@/app/validation/protocols'

export class MatchValidator implements FieldValidator {
  constructor(
    readonly field: string,
    readonly regex: RegExp,
    readonly error: FormError
  ) {}

  validate(value: any): FormError {
    return !value || this.regex.test(value) ? undefined : this.error
  }
}
