import classnames from 'classnames'
import { IFilm } from '../../../api/types'
import { StarRating } from '../StarRating/StarRating'
import { useNavigate } from 'react-router-dom'
import { AbsentImg } from '../AbsentImg/AbsentImg'
import { useTranslation } from 'react-i18next'
import { ReactComponent as ArrowRightIcon } from '../../../assets/images/general/arrow-right.svg'

interface FilmProps extends IFilm {
  className?: string
}

export const Film = ({ img, rating, title, genre, className, id }: FilmProps) => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  return (
    <div className={classnames([className])}>
      <div
        className={`group/film relative bg-img aspect-card-sm rounded-lg overflow-hidden`}
        style={{ backgroundImage: `url(${img})` }}
      >
        {!!img || <AbsentImg className={'absolute inset-0'} />}
        {!!rating && (
          <div className={'absolute top-2.5 right-2.5 z-10 bg-noir/80 backdrop-blur-sm rounded-md px-2 py-0.5'}>
            <StarRating rating={rating} />
          </div>
        )}
        <div
          className={`group-hover/film:opacity-100 opacity-0
            absolute inset-0 bg-noir/70 backdrop-blur-sm flex justify-center items-center transition-opacity duration-300`}
        >
          <button
            onClick={() => navigate(`/films/${id}`)}
            className={
              'flex items-center gap-2 px-3.5 py-1.5 text-sm border border-gold/60 text-text-base font-inter font-medium rounded-md hover:bg-gold/20 hover:border-gold transition-all duration-200'
            }
          >
            {t('film.watchFilm')}
            <ArrowRightIcon className={'w-3 h-3'} />
          </button>
        </div>
      </div>
      <h3 className={'text-base text-white font-bold 2xl:text-lg 2xl:py-2.5'}>{title}</h3>
      <p className={'text-xs text-gold-light font-normal 2xl:text-base'}>{genre}</p>
    </div>
  )
}
