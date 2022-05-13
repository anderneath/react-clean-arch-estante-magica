import { useStrings } from '@/app/main/proxies'
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  Text,
  TextStyle,
  TextTransform,
  TextType
} from '@/app/presentation/components'
import { useLogout } from '@/app/presentation/hooks'
import { Style } from '@/app/presentation/pages/logout'
import { Alignment, ButtonVariant, Colors } from '@/app/presentation/protocols'
import React from 'react'

type Props = {
  hideModal: () => void
}

export const LogoutDialog: React.FC<Props> = ({ hideModal }) => {
  const strings = useStrings()
  const logout = useLogout()

  const onLogoutClicked = () => {
    hideModal()
    logout()
  }

  return (
    <Dialog onBackdropClick={hideModal}>
      <DialogTitle onCloseClick={hideModal}>
        <Text
          type={TextType.bodyL}
          align={Alignment.start}
          transform={TextTransform.uppercase}
          style={TextStyle.bold}
          color={Colors.blackM}
        >
          {strings.logoutDialogTitle}
        </Text>
      </DialogTitle>
      <DialogContent className={Style.content}>
        <Text
          type={TextType.bodyM}
          align={Alignment.start}
          color={Colors.blackM}
        >
          {strings.logoutDialogContent}
        </Text>
      </DialogContent>
      <DialogFooter>
        <Button variant={ButtonVariant.secondary} onClick={hideModal}>
          {strings.cancel}
        </Button>
        <Button onClick={onLogoutClicked}>{strings.logout}</Button>
      </DialogFooter>
    </Dialog>
  )
}
