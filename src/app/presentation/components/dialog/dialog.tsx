import { DialogStyle as Style } from '@/app/presentation/components/dialog'
import React from 'react'

type Props = {
  onBackdropClick?: () => void
}

export const Dialog: React.FC<Props> = ({ children, onBackdropClick }) => {
  return (
    <>
      <div
        className={Style.dialogBackdrop}
        data-dismissible={`${!!onBackdropClick}`}
        onClick={onBackdropClick}
      />
      <div className={Style.dialog}>{children}</div>
    </>
  )
}
