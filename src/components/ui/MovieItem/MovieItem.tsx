import { KeyboardEvent } from 'react'
import { setMovieDBPath } from '../../../utils'
import { AbsentImg } from '../AbsentImg/AbsentImg'
import { RateBadge } from '../RateBadge/RateBadge'
import { Button } from '../Button/Button'

interface MovieItemProps {
  img: string
  name: string
  original_name?: string
  character?: string
  overview: string
  rating: number
  onClick?: () => void
}
export const MovieItem = ({ img, name, original_name, character, overview, rating, onClick }: MovieItemProps) => {
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key == 'Enter') {
      onClick?.()
    }
  }
  return (
    <li className={'pt-[14px] pb-5 flex items-center gap-5 item-border'}>
      <div onClick={onClick} onKeyDown={onKeyDown} tabIndex={0} role={'button'}>
        {img ? (
          <img
            src={setMovieDBPath(img)}
            alt={name}
            className={'rounded-10 w-[144px] h-[205px] object-cover xl:w-[150px] xl:h-[214px]'}
          />
        ) : (
          <AbsentImg className={'rounded-10 w-[144px] h-[205px] object-cover xl:w-[150px] xl:h-[214px]'} />
        )}
      </div>

      <div className={'flex-1 gap-1 md:flex md:items-center md:justify-between lg:gap-[25px]'}>
        <div className={'lg:flex-1 lg:flex lg:items-center lg:justify-between'}>
          <div className={'lg:flex-1'}>
            <p className={'text-17 font-inter font-bold mb-[9px]'}>{name}</p>
            <p className={'text-13 font-inter font-medium text-text-muted'}>{original_name || name}</p>
            <p className={'text-13 font-inter font-medium text-gold-light'}>{character || name}</p>
            <p className={`text-13 text-text-muted mt-[5px] mb-[15px] lg:mb-0 max-h-[100px] overflow-hidden [:last-]`}>
              {overview}
            </p>
          </div>

          <div className={'flex gap-3 lg:pt-5'}>
            <div>
              <RateBadge rating={rating} />
              <p className={'mt-1 text-15 font-inter font-medium'}>Kinoarea</p>
            </div>
            <div>
              <RateBadge rating={rating} />
              <p className={'mt-1 text-15 font-inter font-medium'}>IMDb</p>
            </div>
          </div>
        </div>
        <Button size={'md'} className={'hidden md:block min-w-max'} onClick={onClick}>
          Карточка фильма
        </Button>
      </div>
    </li>
  )
}
