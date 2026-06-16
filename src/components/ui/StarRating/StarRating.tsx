import { memo } from 'react'
import { twMerge } from 'tailwind-merge'
import { getRating } from '../../../utils/getRating'

interface StarRatingProps {
  rating: number
  className?: string
  size?: 'sm' | 'lg'
}

const StarRatingBase = ({ rating, className, size = 'sm' }: StarRatingProps) => {
  if (!rating || rating <= 0) return null

  return (
    <div className={twMerge('flex items-center gap-1', className)} aria-label={`Rating: ${getRating(rating)}`}>
      <span
        className={size === 'lg' ? 'text-gold text-base leading-none' : 'text-gold text-xs leading-none'}
        aria-hidden="true"
      >
        ★
      </span>
      <span
        className={twMerge('font-inter font-medium text-gold', size === 'lg' ? 'text-2xl' : 'text-sm')}
        aria-hidden="true"
      >
        {getRating(rating)}
      </span>
    </div>
  )
}

export const StarRating = memo(StarRatingBase)
StarRating.displayName = 'StarRating'
