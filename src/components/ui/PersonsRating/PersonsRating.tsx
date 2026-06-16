import { RatingItem } from './RatingItem'
import { IPerson } from '../../../api/types'
import { BaseMovieDBAssetsUrl } from '../../../api'

interface PersonsRatingProps {
  list: IPerson[]
  shift?: number
  className?: string
}
export const PersonsRating = ({ list, className, shift = 0 }: PersonsRatingProps) => {
  return (
    <ul
      className={`rounded-[10px] pt-2 pb-3 pl-5 pr-3.5 bg-noir-card grid grid-cols-1 divide-y divide-noir-border mt-2.5
        lg:mt-0 ${className}`}
    >
      {list.map((item, order) => (
        <RatingItem
          img={`${BaseMovieDBAssetsUrl}${item.profile_path}`}
          rate={order + shift}
          age={0}
          actor={item.name}
          originalActorName={item.name}
          key={item.id}
        />
      ))}
    </ul>
  )
}
