import { ValidatorBuilder as Builder } from '@/app/main/builders'
import { ValidationComposite } from '@/app/main/composites'

export const makeSignUpValidation = (): ValidationComposite =>
  ValidationComposite.build([
    ...Builder.field('name').required().min(5).build(),
    ...Builder.field('email').required().email().build(),
    ...Builder.field('password').required().min(4).build(),
    ...Builder.field('passwordConfirmation').required().build()
  ])
