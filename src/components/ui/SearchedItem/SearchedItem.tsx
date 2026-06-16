import { memo, KeyboardEvent } from 'react'
import { twMerge } from 'tailwind-merge'
import { AbsentImg } from '../AbsentImg/AbsentImg'
import { getRating } from '../../../utils/getRating'

interface SearchedFilmProps {
  img: string
  title: string
  rate?: number
  originalName: string
  genre: string
  className?: string
  onClick?: () => void
}

const SearchedItemBase = ({ img, title, rate, genre, originalName, className, onClick }: SearchedFilmProps) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onClick?.()
    }
  }

  return (
    <li>
      <div
        onClick={onClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        className={twMerge('rounded-10 py-2 px-3 bg-noir-soft flex items-center w-full gap-3', className)}
      >
        {img ? (
          <img
            src={img}
            alt={originalName || title}
            className={'w-12 h-16 object-cover rounded-lg flex-shrink-0'}
            loading="lazy"
          />
        ) : (
          <AbsentImg className={'w-12 h-16 rounded-lg flex-shrink-0'} />
        )}

        <div className={'flex-1 min-w-0'}>
          <p className={'font-inter font-bold text-base text-text-base leading-snug'}>{title}</p>
          {originalName && originalName !== title && <p className={'text-sm text-text-muted'}>{originalName}</p>}
          {genre && <p className={'text-xs text-gold-light'}>{genre}</p>}
        </div>

        {rate != null && rate > 0 && (
          <div className={'flex items-center gap-1 flex-shrink-0'} aria-label={`Rating: ${getRating(rate)}`}>
            <span className={'text-gold text-xs leading-none'} aria-hidden="true">
              ★
            </span>
            <span className={'text-sm font-inter font-medium text-gold'} aria-hidden="true">
              {getRating(rate)}
            </span>
          </div>
        )}
      </div>
    </li>
  )
}

export const SearchedItem = memo(SearchedItemBase)
