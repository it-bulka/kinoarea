import { memo, useCallback, type KeyboardEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import { setMovieDBPath } from '../../../utils'
import { AbsentImg } from '../AbsentImg/AbsentImg'
import { IKnownFor } from '../../../api/types/responses'

interface PersonItemProps {
  img?: string
  name: string
  known_for: IKnownFor
  rating: number
  department?: string
  index?: number
  onClick?: () => void
}

export const PersonItem = memo(({ img, name, known_for, rating, department, index, onClick }: PersonItemProps) => {
  const { t } = useTranslation()

  const handleClick = useCallback(() => onClick?.(), [onClick])
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter' || e.key === ' ') onClick?.()
    },
    [onClick]
  )

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chips = known_for
    .slice(0, 4)
    .map(item => ({ id: item.id, name: (item as any).title ?? (item as any).name ?? '' }))

  return (
    <li className="actor-item group relative flex items-center gap-3 md:gap-4 lg:gap-7 py-4 md:py-5 border-b border-noir-border hover:bg-gold/[0.03] transition-colors duration-300 rounded-lg">
      {/* Gold left accent */}
      <div className="absolute left-0 inset-y-3 w-[3px] scale-y-0 group-hover:scale-y-100 bg-gold rounded-r-full transition-transform duration-300 origin-center" />

      {/* Rank number — desktop only */}
      {index !== undefined && (
        <span className="hidden lg:block w-9 text-right text-[28px] leading-none font-inter font-bold text-text-base/[0.07] group-hover:text-gold/20 transition-colors duration-300 select-none flex-shrink-0">
          {String(index + 1).padStart(2, '0')}
        </span>
      )}

      {/* Photo */}
      <div
        role="button"
        tabIndex={0}
        className="relative flex-shrink-0 overflow-hidden rounded-xl md:rounded-2xl w-[88px] h-[126px] md:w-[120px] md:h-[171px] xl:w-[130px] xl:h-[186px] cursor-pointer group-hover:shadow-[0_0_32px_rgba(212,165,116,0.35)] transition-shadow duration-500"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        {img ? (
          <img
            src={setMovieDBPath(img)}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.07]"
          />
        ) : (
          <AbsentImg className="w-full h-full" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-noir/60 via-transparent to-transparent pointer-events-none" />

        {/* Popularity badge — mobile only */}
        <div className="md:hidden absolute bottom-2 right-2 bg-noir/80 rounded-lg px-1.5 py-0.5 text-center">
          <p className="text-[13px] font-inter font-bold text-text-base leading-none">{Math.round(rating)}</p>
          <p className="text-[8px] text-text-muted uppercase tracking-wide leading-tight mt-[1px]">pop</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-6">
        <div
          role="button"
          tabIndex={-1}
          className="flex-1 min-w-0 cursor-pointer"
          onClick={handleClick}
          onKeyDown={handleKeyDown}
        >
          {department && (
            <span className="block text-[10px] md:text-[11px] font-inter font-semibold uppercase tracking-[0.14em] text-gold/70 mb-1 md:mb-1.5">
              {department}
            </span>
          )}
          <h3 className="text-[17px] md:text-2xl lg:text-[28px] font-playfair font-bold text-text-base leading-snug line-clamp-2 md:line-clamp-1 mb-2 md:mb-3">
            {name}
          </h3>
          {chips.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {chips.map((chip, i) => (
                <Link
                  key={chip.id}
                  to={`/films/${chip.id}`}
                  onClick={e => e.stopPropagation()}
                  className={classnames(
                    'text-[10px] md:text-xs bg-noir-soft hover:bg-gold/20 text-text-muted hover:text-text-base border border-noir-border hover:border-gold/40 rounded-full px-2.5 py-[3px] transition-all duration-200 font-inter font-medium truncate max-w-[100px] md:max-w-[160px]',
                    { 'hidden md:inline-flex': i >= 2 }
                  )}
                >
                  {chip.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Popularity + button — desktop */}
        <div className="hidden md:flex items-center gap-5 flex-shrink-0">
          <div className="text-center min-w-[48px]">
            <p className="text-[30px] font-inter font-bold text-text-base leading-none">{Math.round(rating)}</p>
            <p className="text-[10px] text-text-muted uppercase tracking-[0.1em] mt-1 font-inter font-medium">
              {t('actor.popularity')}
            </p>
          </div>
          <button
            onClick={handleClick}
            className="flex items-center gap-2 px-4 py-[9px] rounded-full border border-noir-border text-text-muted text-sm font-inter font-medium hover:border-gold hover:text-text-base hover:bg-gold/10 transition-all duration-300 cursor-pointer group/btn"
          >
            {t('actor.profile')}
            <span className="text-gold group-hover/btn:translate-x-0.5 transition-transform duration-200">→</span>
          </button>
        </div>
      </div>
    </li>
  )
})

PersonItem.displayName = 'PersonItem'
