import { KeyboardEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { setMovieDBPath } from '../../../utils'
import { getRating } from '../../../utils/getRating'
import { AbsentImg } from '../AbsentImg/AbsentImg'
import { ReactComponent as ArrowRightIcon } from '../../../assets/images/general/arrow-right.svg'

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
  const { t } = useTranslation()

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') onClick?.()
  }

  return (
    <li>
      <div
        className={
          'bg-noir-card rounded-10 p-3 md:p-4 flex gap-3 md:gap-4 transition-colors hover:bg-noir-soft cursor-pointer'
        }
        onClick={onClick}
        onKeyDown={onKeyDown}
        tabIndex={0}
        role={'button'}
      >
        {img ? (
          <img
            src={setMovieDBPath(img)}
            alt={name}
            className={'w-20 h-[115px] md:w-[100px] md:h-[144px] object-cover rounded-lg flex-shrink-0'}
          />
        ) : (
          <AbsentImg className={'w-20 h-[115px] md:w-[100px] md:h-[144px] rounded-lg flex-shrink-0'} />
        )}

        <div className={'flex-1 min-w-0 flex flex-col justify-between py-0.5'}>
          <div>
            <p className={'font-playfair font-bold text-base text-text-base leading-snug mb-1'}>{name}</p>
            {original_name && original_name !== name && (
              <p className={'text-xs font-inter text-text-muted mb-0.5'}>{original_name}</p>
            )}
            {character && <p className={'text-xs font-inter text-gold-light mb-2'}>{character}</p>}
            <p className={'text-sm font-inter text-text-muted line-clamp-2 md:line-clamp-3'}>{overview}</p>
          </div>

          <div className={'flex items-center justify-between mt-2 flex-wrap gap-2'}>
            {!!rating && (
              <div className={'flex items-center gap-1'}>
                <span className={'text-gold text-xs leading-none'}>★</span>
                <span className={'text-sm font-inter font-medium text-gold'}>{getRating(rating)}</span>
              </div>
            )}
            <button
              className={
                'hidden md:flex items-center gap-1.5 px-3 py-1.5 border border-gold/60 text-gold text-xs font-inter font-medium rounded-lg hover:bg-gold/10 hover:border-gold transition-all duration-200'
              }
              onClick={e => {
                e.stopPropagation()
                onClick?.()
              }}
            >
              {t('film.watchFilm')}
              <ArrowRightIcon className={'w-3 h-3'} />
            </button>
          </div>
        </div>
      </div>
    </li>
  )
}
