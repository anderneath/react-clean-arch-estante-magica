import { useStrings } from '@/app/main/proxies'
import { Assets } from '@/app/presentation/assets'
import { Asset, Text, TextType } from '@/app/presentation/components'
import { Style } from '@/app/presentation/pages/not-found'
import { Alignment, Colors } from '@/app/presentation/protocols'
import React from 'react'

export const NotFoundPage: React.FC = () => {
  const strings = useStrings()
  return (
    <div className={Style.contentWrap}>
      <Asset src={Assets.notFound} align={Alignment.center} />
      <div>
        <Text type={TextType.H1} color={Colors.blackD}>
          404
        </Text>
        <Text type={TextType.H3} color={Colors.blackML}>
          {strings.notFoundPage}
        </Text>
      </div>
    </div>
  )
}
