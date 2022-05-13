import { DialogStyle as Style } from '@/app/presentation/components/dialog'
import { Close } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import React from 'react'

type Props = {
  onCloseClick?: () => void
}

export const DialogTitle: React.FC<Props> = ({ children, onCloseClick }) => {
  return (
    <div className={Style.dialogTitle} data-close-icon={!!onCloseClick}>
      {children}
      {onCloseClick && (
        <IconButton className={Style.iconButton} onClick={onCloseClick}>
          <Close sx={{ color: 'black' }} />
        </IconButton>
      )}
    </div>
  )
}
