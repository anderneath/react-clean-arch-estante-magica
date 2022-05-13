import { useAccount } from '@/app/main/proxies'
import { Routes } from '@/app/presentation/protocols'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export const PrivateRoute: React.FC = () => {
  const [account] = useAccount()
  return account?.accessToken ? <Outlet /> : <Navigate to={Routes.login} />
}
