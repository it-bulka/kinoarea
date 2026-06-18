import { Logo } from '../Logo/Logo'
import { ReactComponent as CloseIcon } from '../../../assets/images/general/close.svg'
import classnames from 'classnames'
import { NavLinks } from '../NavLinks/NavLinks'

interface NavigationProps {
  isOpen?: boolean
  onClose?: () => void
}
export const Navigation = ({ isOpen, onClose }: NavigationProps) => {
  return (
    <nav
      className={classnames(
        `fixed top-0 bottom-0 left-0 right-0 bg-noir/95 pt-9 transition-[right] duration-500 overflow-hidden z-50
        md:static md:pt-6 md:pb-9
        lg:pb-8 
        xl:hidden`,
        {
          'right-full ': !isOpen,
        }
      )}
    >
      <div className={'container md:hidden'}>
        <div className={'relative'}>
          <button className={classnames('absolute right-0 top-0', { hidden: !isOpen })} onClick={onClose}>
            <CloseIcon />
          </button>
          <Logo classes={'mx-auto mb-5'} />
        </div>
      </div>
      <NavLinks
        className={`text-sm flex flex-col text-center gap-8
          md:flex-row md:gap-0.5 md:justify-between md:w-[78%] md:mx-auto md:text-xs
          lg:max-w-[523px]`}
        onClick={onClose}
      />
    </nav>
  )
}
