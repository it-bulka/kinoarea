/* There is window EventListener set for keyboard interaction */
/* eslint jsx-a11y/click-events-have-key-events: 0,jsx-a11y/no-static-element-interactions: 0 */

import { type FC, ReactNode, useRef, useState, useCallback, MouseEvent, useEffect } from 'react'
import cls from './Modal.module.scss'
import { Portal } from '../../Portal/Portal'
import { ReactComponent as CloseIcon } from '../../../../assets/images/general/close-btn.svg'
import classnames from 'classnames'
import { twMerge } from 'tailwind-merge'

export type SimulateCloseCb = () => void
export interface ModalProps {
  className?: string
  contentClassName?: string
  children: ReactNode
  close: () => void
  isOpened: boolean
  overlay?: 'on' | 'off'
  size?: 'fit' | 'max'
  getSimulateCloseCb?: (cb: SimulateCloseCb) => void
}

const ANIMATION_TIME = 400

export const Modal: FC<ModalProps> = ({
  children,
  close,
  isOpened,
  overlay = 'on',
  size = 'fit',
  contentClassName,
  getSimulateCloseCb,
}) => {
  const [isClosing, setIsClosing] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const closeHandler = useCallback(() => {
    if (close) {
      setIsClosing(true)
      timer.current = setTimeout(() => {
        close()
        setIsClosing(false)
      }, ANIMATION_TIME)
    }
  }, [close])

  const onContentClick = useCallback((e: MouseEvent<HTMLElement>) => {
    e.stopPropagation()
  }, [])

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeHandler()
      }
    },
    [closeHandler]
  )

  useEffect(() => {
    if (isOpened) {
      window.addEventListener('keydown', onKeyDown)
    }

    return () => {
      timer.current && clearTimeout(timer.current as ReturnType<typeof setTimeout>)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpened, onKeyDown])

  useEffect(() => {
    getSimulateCloseCb?.(closeHandler)
  }, [getSimulateCloseCb])

  if (!isOpened) return null

  return (
    <Portal>
      <div
        className={classnames(cls.modal, {
          [cls.closing]: isClosing,
          [cls.opened]: isOpened,
        })}
      >
        <div className={cls.overlay + ' ' + cls[overlay]} onClick={closeHandler}>
          <div
            className={twMerge(
              cls.content,
              size === 'max' ? 'w-[90vw] md:min-w-[60%] md:max-w-[80%] xl:max-w-[1000px]' : 'w-fit',
              contentClassName
            )}
            onClick={onContentClick}
          >
            <button className={cls.closeBtn} onClick={closeHandler}>
              <CloseIcon className={twMerge('stroke-white', cls.icon)} />
            </button>
            <div className={'max-h-[80vh] overflow-y-scroll'}>{children}</div>
          </div>
        </div>
      </div>
    </Portal>
  )
}
