import { ValidatorBuilder as Builder } from '@/app/main/builders'
import { ValidationComposite } from '@/app/main/composites'
import { FormError } from '@/app/validation/errors'

export const makeAddStudentsValidation = (): ValidationComposite =>
  ValidationComposite.build([
    ...Builder.field('names')
      .required()
      .match(/^([^ \n]+[ ]+[^\n]+\n?|[ \n])+$/, FormError.fullNameRequired)
      .build()
  ])
