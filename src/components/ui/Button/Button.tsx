import { ButtonHTMLAttributes, PropsWithChildren } from 'react'
import cls from './Button.module.scss'
import { twMerge } from 'tailwind-merge'

type BtnVariant = 'icon' | 'primary' | 'transparent' | 'white' | 'yellow'
type BtnSizes = 'normal' | 'md' | 'sm'
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void
  variant?: BtnVariant
  size?: BtnSizes
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

export const Button = ({
  children,
  onClick,
  variant = 'primary',
  size = 'normal',
  className,
  type = 'button',
  ...rest
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      onClick={onClick}
      type={type}
      {...rest}
      className={twMerge(`rounded-md w-max block ${cls[variant]} ${cls[size]} ${className}`)}
    >
      {children}
    </button>
  )
}
