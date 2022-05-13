import { Strings } from '@/app/presentation/i18n/strings'
import React, { createContext, useContext } from 'react'

type Props = {
  strings: Strings
}

const StringsContext = createContext<Strings>(null)

const StringsProvider: React.FC<Props> = ({ strings, children }) => {
  return (
    <StringsContext.Provider value={strings}>
      {children}
    </StringsContext.Provider>
  )
}

const useStrings = () => useContext(StringsContext)

export { StringsProvider, useStrings }
