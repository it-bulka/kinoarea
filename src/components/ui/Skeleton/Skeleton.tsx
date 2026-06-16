import classnames from 'classnames'
import cls from './Skeleton.module.scss'

interface SkeletonProps {
  className?: string
  rounded?: 'sm' | 'full'
}

export const Skeleton = ({ className, rounded }: SkeletonProps) => (
  <div
    className={classnames(
      'bg-noir-soft',
      cls.shimmer,
      rounded === 'full' && 'rounded-full',
      rounded === 'sm' && 'rounded-5',
      className
    )}
  />
)
