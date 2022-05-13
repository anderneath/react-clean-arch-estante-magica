import { Style } from '@/app/presentation/components/asset'
import { Alignment } from '@/app/presentation/protocols'
import React from 'react'

type Props = {
  src: any
  align?: Alignment
}

export const Asset: React.FC<Props> = ({ src, align = Alignment.start }) => {
  return (
    <div className={Style.assetWrap} data-align={align}>
      <img src={src} />
    </div>
  )
}
