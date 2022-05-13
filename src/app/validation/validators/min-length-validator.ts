import { FormError } from '@/app/validation/errors'
import { FieldValidator } from '@/app/validation/protocols'

export class MinLengthValidator implements FieldValidator {
  constructor(readonly field: string, private readonly minLength: number) {}

  validate(value: any): FormError {
    return value?.length < this.minLength
      ? FormError.minLengthRequired
      : undefined
  }
}
