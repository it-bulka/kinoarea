import { memo } from 'react'
import { useTranslation } from 'react-i18next'

interface RatingItemProps {
  rate: string | number
  actor: string
  knownFor?: string
}

const RatingItemBase = ({ rate, actor, knownFor }: RatingItemProps) => {
  const { t } = useTranslation()

  return (
    <li className={'flex justify-between items-center py-2'}>
      <div className={'min-w-0 mr-2'}>
        <p className={'text-15 font-inter font-bold text-text-base'}>{actor}</p>
        {knownFor && (
          <p className={'text-11 mt-[3px] text-gold-light truncate'}>
            <span className={'opacity-70'}>{t('actor.knownFor')} </span>
            {knownFor}
          </p>
        )}
      </div>
      <p className={'text-15 text-gold-light font-inter font-semibold flex-shrink-0'}>{rate} місце</p>
    </li>
  )
}

export const RatingItem = memo(RatingItemBase)
RatingItem.displayName = 'RatingItem'
