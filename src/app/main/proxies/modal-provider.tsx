import React, { createContext, useCallback, useContext, useState } from 'react'

type Props = {
  showModal: (modal: JSX.Element) => void
  hideModal: () => void
}

const ModalContext = createContext<Props>(null)

const ModalProvider: React.FC = ({ children }) => {
  const [modal, showModal] = useState<JSX.Element>(undefined)
  const hideModal = useCallback(() => {
    showModal(undefined)
  }, [showModal])

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      {modal}
    </ModalContext.Provider>
  )
}

const useModal = () => useContext(ModalContext)

export { ModalProvider, useModal }
