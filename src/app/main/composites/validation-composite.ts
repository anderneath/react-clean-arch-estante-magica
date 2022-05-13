import { Validation } from '@/app/presentation/protocols'
import { FormError } from '@/app/validation/errors'
import { FieldValidator } from '@/app/validation/protocols'

export class ValidationComposite implements Validation {
  private constructor(private readonly validators: FieldValidator[]) {}

  static build(validators: FieldValidator[]): ValidationComposite {
    return new ValidationComposite(validators)
  }

  validate(field: string, value: any): FormError {
    const validators = this.validators.filter(v => v.field === field)
    for (const validator of validators) {
      const error = validator.validate(value)
      if (error) {
        return error
      }
    }
    return undefined
  }
}
