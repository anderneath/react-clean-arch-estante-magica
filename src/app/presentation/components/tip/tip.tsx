import { Style } from '@/app/presentation/components/tip'
import { Colors } from '@/app/presentation/protocols'
import React from 'react'

type Props = {
  className: string
  color: Colors
}

export const Tip: React.FC<Props> = ({ children, color, className }) => {
  return (
    <div
      className={className ? `${Style.tip} ${className}` : Style.tip}
      data-color={color}
    >
      {children}
    </div>
  )
}
