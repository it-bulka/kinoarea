import { useRef } from 'react'
import { Modal, SimulateCloseCb } from '../Modal/Modal'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import { useActions } from '../../../../hooks/useActions'
import { Typography, TypographyTypes } from '../../Typography/Typography'
import { Button } from '../../Button/Button'
import { useTranslation } from 'react-i18next'

export const Notification = () => {
  const notification = useTypedSelector(state => state.notification.message)
  const refCloseModalCb = useRef<SimulateCloseCb | null>(null)
  const { clearNotification } = useActions()
  const { t } = useTranslation()

  return (
    <Modal
      close={clearNotification}
      isOpened={!!notification}
      getSimulateCloseCb={cb => (refCloseModalCb.current = cb)}
    >
      <Typography type={TypographyTypes._TITLE} variant={'h3'} className={'text-center mb-5'}>
        {notification ? t(notification) : ''}
      </Typography>
      <Button variant={'transparent'} className={'w-full'} onClick={() => refCloseModalCb.current?.()}>
        {t('common.ok')}
      </Button>
    </Modal>
  )
}
