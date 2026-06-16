import { HTMLAttributes, ReactNode, useState } from 'react'

interface CheckboxProps extends HTMLAttributes<HTMLInputElement> {
  label?: ReactNode | string
  isChecked?: boolean
  onChecked?: (status: boolean) => void
  className?: string
  name: string
}
export function Checkbox({ label, name, className, isChecked, onChecked }: CheckboxProps) {
  const [checked, setChecked] = useState(isChecked || false)
  const changeHandler = () => {
    setChecked(prev => !prev)
    onChecked?.(!checked)
  }
  return (
    <label className={`relative flex gap-3 ${className}`}>
      <input
        type={`checkbox`}
        name={name}
        onChange={changeHandler}
        className={'w-0 h-0 absolute opacity-0'}
        checked={isChecked}
      />
      <span className={`shrink-0 basis-[17px] h-[17px] rounded-sm bg-gold flex-center`}>
        <span className={`${isChecked ? 'bg-checkmark' : ''} bg-img w-1.5 h-1`} />
      </span>
      {label && <span className={'text-sm'}>{label}</span>}
    </label>
  )
}
