import { useStrings } from '@/app/main/proxies'
import { FormError } from '@/app/validation/errors'

export const useFormErrorHandler = () => {
  const strings = useStrings()
  return (error: FormError): string => {
    switch (error) {
      case FormError.minLengthRequired:
        return strings.minLengthRequired(6)
      default:
        return strings[error]
    }
  }
}
