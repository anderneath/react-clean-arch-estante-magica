import { ValidatorBuilder as Builder } from '@/app/main/builders'
import { ValidationComposite } from '@/app/main/composites'
import { FormError } from '@/app/validation/errors'

export const makeAddClassValidation = (): ValidationComposite =>
  ValidationComposite.build([
    ...Builder.field('name').required().min(3).build(),
    ...Builder.field('grade').required().build(),
    ...Builder.field('teacherName')
      .required()
      .match(/^([^ \n]+\ +[^ \n]+)+$/, FormError.fullNameRequired)
      .build()
  ])
