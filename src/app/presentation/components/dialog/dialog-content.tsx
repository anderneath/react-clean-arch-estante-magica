import { DialogStyle as Style } from '@/app/presentation/components/dialog'
import React from 'react'

type Props = {
  className?: string
}

export const DialogContent: React.FC<Props> = ({ children, className }) => {
  return (
    <div
      className={
        className ? `${Style.dialogContent} ${className}` : Style.dialogContent
      }
    >
      {children}
    </div>
  )
}
