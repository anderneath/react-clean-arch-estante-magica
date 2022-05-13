import { Style } from '@/app/presentation/components/text'
import { Alignment, Colors } from '@/app/presentation/protocols'
import React from 'react'

const enum TextType {
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  H4 = 'h4',
  bodyS = 'bodyS',
  bodyM = 'bodyM',
  bodyL = 'bodyL',
  bodyAllCaps = 'bodyAllCaps',
  bodyNumbers = 'bodyNumbers'
}

const enum TextStyle {
  regular = 'regular',
  bold = 'bold',
  italic = 'italic'
}

const enum TextTransform {
  uppercase = 'uppercase',
  lowercase = 'lowercase',
  capitalize = 'capitalize'
}

type Props = {
  className?: string
  type: TextType
  style?: TextStyle
  color?: Colors
  align?: Alignment
  transform?: TextTransform
}

const Text: React.FC<Props> = ({
  className,
  children,
  type,
  color,
  style,
  align = Alignment.center,
  transform
}) => {
  return (
    <div className={className ? `${Style.text} ${className}` : Style.text}>
      <div
        className={Style[type]}
        data-color={color}
        data-style={style}
        data-align={align}
        data-transform={transform}
      >
        {children}
      </div>
    </div>
  )
}

export { Text, TextType, TextStyle, TextTransform }
