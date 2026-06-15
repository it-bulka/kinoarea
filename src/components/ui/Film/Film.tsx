import classnames from 'classnames'
import { Button } from '../Button/Button'
import { IFilm } from '../../../api/types'
import { RateBadge } from '../RateBadge/RateBadge'
import { useNavigate } from 'react-router-dom'
import { AbsentImg } from '../AbsentImg/AbsentImg'
import { useTranslation } from 'react-i18next'
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
        {!!rating && <RateBadge rating={rating} className={'absolute top-2.5 right-2.5'} />}
        <div
          className={`group-hover/film:opacity-100 opacity-0 
            absolute inset-0 bg-blue bg-opacity-60 flex justify-center items-center transition-opacity`}
        >
          <Button variant={'white'} className={'py-7'} onClick={() => navigate(`/films/${id}`)}>
            {t('film.watchFilm')}
          </Button>
        </div>
      </div>
      <h3 className={'text-base text-white font-bold 2xl:text-lg 2xl:py-2.5'}>{title}</h3>
      <p className={'text-xs text-yellowish font-normal 2xl:text-base'}>{genre}</p>
    </div>
  )
}
