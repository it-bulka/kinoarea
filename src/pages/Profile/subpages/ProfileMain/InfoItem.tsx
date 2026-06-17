import { memo } from 'react'
import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import cls from './ProfileMain.module.scss'

export interface InfoItemProps {
  amount: number
  title: string
  to?: string
  icon?: ReactNode
}

const InfoItemInner = ({ amount, title, icon }: Pick<InfoItemProps, 'amount' | 'title' | 'icon'>) => (
  <>
    {icon && <span className={cls.statIcon}>{icon}</span>}
    <p className={cls.statNumber}>{amount}</p>
    <p className={cls.statLabel}>{title}</p>
  </>
)

export const InfoItem = memo(({ amount, title, to, icon }: InfoItemProps) => {
  if (to) {
    return (
      <Link to={to} className={cls.statCard}>
        <InfoItemInner amount={amount} title={title} icon={icon} />
      </Link>
    )
  }

  return (
    <div className={cls.statCard}>
      <InfoItemInner amount={amount} title={title} icon={icon} />
    </div>
  )
})
InfoItem.displayName = 'InfoItem'
