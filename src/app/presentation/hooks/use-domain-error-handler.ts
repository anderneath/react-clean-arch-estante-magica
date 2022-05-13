import { DomainError } from '@/app/domain/errors'
import { useStrings } from '@/app/main/proxies'
import { useLogout } from '@/app/presentation/hooks'

export const useDomainErrorHandler = () => {
  const logout = useLogout()
  const strings = useStrings()
  return (error: DomainError): string => {
    switch (error) {
      case DomainError.unauthenticated:
        logout()
        break
      default:
        return strings[error]
    }
    return undefined
  }
}
