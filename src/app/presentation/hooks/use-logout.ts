import { useAccount } from '@/app/main/proxies'
import { useNavigate } from 'react-router-dom'

export const useLogout = () => {
  const navigate = useNavigate()
  const [, setUser] = useAccount()
  return (): void => {
    setUser(undefined)
    navigate('/login')
  }
}
