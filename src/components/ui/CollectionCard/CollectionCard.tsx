import { memo, useCallback, useMemo } from 'react'
import { ICategories } from '../../../api/types/categories'
import { CategoriesTypes } from '../../../mock/categories'
import { Button } from '../Button/Button'
import { ReactComponent as Logo } from '../../../assets/images/general/logo-2.svg'
import { setMovieDBPath } from '../../../utils'
import { useTranslation } from 'react-i18next'

interface CollectionCardProps {
  item: ICategories
  posterUrl: string | null
  onClick: (item: ICategories) => void
}

export const CollectionCard = memo(({ item, posterUrl, onClick }: CollectionCardProps) => {
  const { t } = useTranslation()

  const description = useMemo(
    () =>
      item.title.includes('.items.')
        ? t(item.title.replace('.items.', '.descriptions.'))
        : t(`collections.typeLabel.${item.types as CategoriesTypes}`),
    [item.title, item.types, t]
  )

  const handleClick = useCallback(() => onClick(item), [onClick, item])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') onClick(item)
    },
    [onClick, item]
  )

  return (
    <div
      role="button"
      tabIndex={0}
      className="collection-card group relative overflow-hidden rounded-xl cursor-pointer bg-darkBlue-2 aspect-[4/3] transition-all duration-500 hover:shadow-[0_8px_40px_rgba(54,87,203,0.45)] hover:scale-[1.03] hover:-translate-y-1"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {posterUrl ? (
        <img
          src={setMovieDBPath(posterUrl)}
          alt={t(item.title)}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <Logo className="w-1/2 text-white/5" />
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/30 to-transparent" />

      <div className="relative z-10 h-full flex flex-col justify-end p-4 md:p-5 lg:p-6">
        <span className="text-[11px] font-q-600 uppercase tracking-widest text-yellowish mb-2">
          {t(`collections.typeLabel.${item.types as CategoriesTypes}`)}
        </span>
        <h3 className="text-base md:text-lg lg:text-xl font-q-700 text-white leading-tight mb-1">{t(item.title)}</h3>
        <p className="text-xs text-white/60 mb-4 line-clamp-2 hidden md:block">{description}</p>
        <div className="self-start opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none">
          <Button size="md" className="text-sm">
            {t('collections.browse')}
          </Button>
        </div>
      </div>
    </div>
  )
})

CollectionCard.displayName = 'CollectionCard'
