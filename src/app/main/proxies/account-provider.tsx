import { AccountEntity } from '@/app/domain/entities'
import { GetAccount, SetAccount } from '@/app/domain/usecases'
import React, { createContext, useContext, useEffect, useState } from 'react'

type Props = {
  getAccount: GetAccount
  setAccount: SetAccount
}

const AccountContext =
  createContext<
    [
      account: AccountEntity,
      setAccountAdapter: React.Dispatch<React.SetStateAction<AccountEntity>>
    ]
  >(null)

const AccountProvider: React.FC<Props> = ({
  getAccount: getAccountAdapter,
  setAccount: setAccountAdapter,
  children
}) => {
  const [account, setAccount] = useState<AccountEntity>(getAccountAdapter.get())

  useEffect(() => setAccountAdapter.set(account), [account])

  return (
    <AccountContext.Provider value={[account, setAccount]}>
      {children}
    </AccountContext.Provider>
  )
}

const useAccount = () => useContext(AccountContext)

export { AccountProvider, useAccount }
