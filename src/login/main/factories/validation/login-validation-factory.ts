import { ValidatorBuilder as Builder } from '@/app/main/builders'
import { ValidationComposite } from '@/app/main/composites'

export const makeLoginValidation = (): ValidationComposite =>
  ValidationComposite.build([
    ...Builder.field('email').required().email().build(),
    ...Builder.field('password').required().min(5).build()
  ])
