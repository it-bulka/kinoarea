import { memo } from 'react'
import { twMerge } from 'tailwind-merge'
import { RatingItem } from './RatingItem'
import { IPerson } from '../../../api/types'
import { getKnownForTitle } from '../../../utils/getKnownForTitle'

interface PersonsRatingProps {
  list: IPerson[]
  shift?: number
  className?: string
}

const PersonsRatingBase = ({ list, className, shift = 0 }: PersonsRatingProps) => {
  return (
    <ul
      className={twMerge(
        'rounded-[10px] pt-2 pb-3 pl-5 pr-3.5 bg-noir-card grid grid-cols-1 divide-y divide-noir-border mt-2.5 lg:mt-0',
        className
      )}
    >
      {list.map((item, order) => (
        <RatingItem rate={order + shift} actor={item.name} knownFor={getKnownForTitle(item.known_for)} key={item.id} />
      ))}
    </ul>
  )
}

export const PersonsRating = memo(PersonsRatingBase)
PersonsRating.displayName = 'PersonsRating'
