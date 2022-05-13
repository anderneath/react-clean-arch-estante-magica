import { Assets } from '@/app/presentation/assets'
import { Asset } from '@/app/presentation/components'
import { Style } from '@/app/presentation/components/button'
import { Alignment, ButtonVariant } from '@/app/presentation/protocols'
import React from 'react'

type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  variant?: ButtonVariant
  icon?: JSX.Element
  onClick?: () => void
  align?: Alignment
  isLoading?: boolean
  children: any
}

export const Button: React.FC<Props> = ({
  type = 'button',
  variant = ButtonVariant.primary,
  icon,
  onClick,
  align = Alignment.center,
  isLoading = false,
  children,
  ...props
}: Props) => {
  return (
    <div className={Style.buttonWrap} data-align={align}>
      <button
        className={Style[variant]}
        type={type}
        {...props}
        onClick={onClick}
      >
        {isLoading ? <Asset src={Assets.spinner} /> : children}
      </button>
    </div>
  )
}
