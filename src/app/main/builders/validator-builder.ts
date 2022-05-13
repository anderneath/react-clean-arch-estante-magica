import { FormError } from '@/app/validation/errors'
import { FieldValidator } from '@/app/validation/protocols'
import {
  EmailValidator,
  MatchValidator,
  MinLengthValidator,
  RequiredFieldValidator
} from '@/app/validation/validators'

export class ValidatorBuilder {
  private constructor(
    private readonly field: string,
    private readonly validators: FieldValidator[]
  ) {}

  static field(field: string): ValidatorBuilder {
    return new ValidatorBuilder(field, [])
  }

  required(): ValidatorBuilder {
    this.validators.push(new RequiredFieldValidator(this.field))
    return this
  }

  email(): ValidatorBuilder {
    this.validators.push(new EmailValidator(this.field))
    return this
  }

  min(length: number): ValidatorBuilder {
    this.validators.push(new MinLengthValidator(this.field, length))
    return this
  }

  match(regex: RegExp, error: FormError) {
    this.validators.push(new MatchValidator(this.field, regex, error))
    return this
  }

  build(): FieldValidator[] {
    return this.validators
  }
}
