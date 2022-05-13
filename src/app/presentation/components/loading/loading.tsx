import { useStrings } from '@/app/main/proxies'
import { Assets } from '@/app/presentation/assets'
import { Asset, Text, TextType } from '@/app/presentation/components'
import { Style } from '@/app/presentation/components/loading'
import { Alignment, Colors } from '@/app/presentation/protocols'
import React from 'react'

export const Loading: React.FC = () => {
  const strings = useStrings()
  return (
    <div className={Style.loading}>
      <Asset src={Assets.starLoading} />
      <Text type={TextType.H4} color={Colors.blackM} align={Alignment.center}>
        <span className={Style.loadingText}>{strings.loading}</span>
      </Text>
    </div>
  )
}
