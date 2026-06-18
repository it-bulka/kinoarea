import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { AbsentImg } from '../AbsentImg/AbsentImg'

interface PersonCardProps {
  img: string
  rate: string | number
  actor: string
  knownFor?: string
}

const PersonCardBase = ({ img, rate, actor, knownFor }: PersonCardProps) => {
  const { t } = useTranslation()

  return (
    <div
      className={`aspect-square rounded-[10px] overflow-hidden relative flex flex-col
        pt-1.5 pb-3 px-2
        md:pt-[9px] md:pb-[23px] md:px-[13px]
        lg:pt-[7px] lg:px-2.5 lg:pb-5`}
    >
      {img ? (
        <img
          src={img}
          alt={actor}
          className={'absolute inset-0 w-full h-full object-cover object-top'}
          loading="lazy"
        />
      ) : (
        <AbsentImg className={'absolute inset-0 w-full h-full'} />
      )}

      <div className={'absolute inset-0 bg-gradient-to-t from-noir/80 via-transparent to-transparent'} />

      <p className={'relative z-10 flex-1 text-xs text-gold-light font-inter font-medium'}>{rate}-е місце</p>
      <h5 className={'relative z-10 text-sm font-inter font-bold md:text-xl'}>{actor}</h5>
      {knownFor && (
        <p className={'relative z-10 text-xs text-gold-light font-inter font-medium mt-0.5 truncate'}>
          <span className={'opacity-70'}>{t('actor.knownFor')} </span>
          {knownFor}
        </p>
      )}
    </div>
  )
}

export const PersonCard = memo(PersonCardBase)
PersonCard.displayName = 'PersonCard'
