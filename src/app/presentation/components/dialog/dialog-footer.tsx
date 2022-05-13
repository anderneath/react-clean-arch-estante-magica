import { DialogStyle as Style } from '@/app/presentation/components/dialog'
import React from 'react'

export const DialogFooter: React.FC = ({ children }) => {
  return <div className={Style.dialogFooter}>{children}</div>
}
