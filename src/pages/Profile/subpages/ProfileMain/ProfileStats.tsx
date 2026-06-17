import { memo } from 'react'
import type { ReactNode } from 'react'
import { InfoItem } from './InfoItem'
import cls from './ProfileMain.module.scss'

export interface StatItem {
  id: number
  title: string
  amount: number
  to?: string
  icon?: ReactNode
}

interface ProfileStatsProps {
  items: StatItem[]
}

export const ProfileStats = memo(({ items }: ProfileStatsProps) => (
  <section className={cls.statsRow} aria-label="Statistics">
    {items.map(item => (
      <InfoItem key={item.id} title={item.title} amount={item.amount} to={item.to} icon={item.icon} />
    ))}
  </section>
))
ProfileStats.displayName = 'ProfileStats'
