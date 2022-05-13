import { useModal } from '@/app/main/proxies'
import { Assets } from '@/app/presentation/assets'
import { Asset, Text, TextType } from '@/app/presentation/components'
import Style from '@/app/presentation/components/header/header-style.scss'
import { LogoutDialog } from '@/app/presentation/pages'
import { Routes } from '@/app/presentation/protocols'
import { Logout } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import React, { memo } from 'react'
import { Link } from 'react-router-dom'

type Props = {
  children: any
  title: string
  history?: { label: string; route: string }[]
}

export const Header: React.FC<Props> = memo(({ title, children, history }) => {
  const { showModal, hideModal } = useModal()
  const onLogoutPressed = (): void => {
    showModal(<LogoutDialog hideModal={hideModal} />)
  }
  return (
    <header className={Style.headerWrap}>
      <div className={Style.headerLeading}>
        <Link to={Routes.home}>
          <Asset src={Assets.logoWhite}></Asset>
        </Link>
        <div className={Style.headerTitle}>
          {history?.map((route, index) => {
            return (
              <div className={Style.historyWrap} key={index}>
                <Link className={Style.history} to={route.route} replace={true}>
                  {route.label}
                </Link>
                <div className={Style.historySlash}>/</div>
              </div>
            )
          })}
          <Text type={TextType.H2}>{title}</Text>
        </div>
      </div>
      <div className={Style.headerActions}>
        {children}
        <IconButton onClick={onLogoutPressed} children={<Logout />} />
      </div>
    </header>
  )
})
