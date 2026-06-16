import { ReactComponent as PlayIcon } from '../../../../assets/images/general/play-btn.svg'
import { useTranslation } from 'react-i18next'
import { Breadcrumbs } from '../../../../components/ui/Breadcrumbs/Breadcrumbs'
import { StarRating } from '../../../../components/ui/StarRating/StarRating'
import { Button } from '../../../../components/ui/Button/Button'
import { IconBtn } from '../../../../components/ui/IconBtn/IconBtn'
import { MovieModal } from '../../../../components/ui/modals/MovieModal/MovieModal'
import { Description } from '../Descriotion/Description'
import { setMovieDBPath } from '../../../../utils'
import { IMovieDetailsRes } from '../../../../api/types/responses'
import { IFbFavouriteMovie } from '../../../../api/types/film'

interface FilmHeroProps {
  details: IMovieDetailsRes
  isModalOpen: boolean
  trailerKey: string | null
  favouriteFilm: IFbFavouriteMovie | null
  onPlay: () => void
  onCloseModal: () => void
  onLike: () => void
  onDislike: () => void
  onFavourite: () => void
}

export const FilmHero = ({
  details,
  isModalOpen,
  trailerKey,
  favouriteFilm,
  onPlay,
  onCloseModal,
  onLike,
  onDislike,
  onFavourite,
}: FilmHeroProps) => {
  const { t } = useTranslation()

  return (
    <>
      <section className={'md:flex md:flex-row-reverse md:justify-end md:gap-[17px] lg:gap-8 2xl:gap-[54px]'}>
        <div>
          <div className={'w-full mb-3 md:mb-4'}>
            <Breadcrumbs lastCrumb={details.title} />
            <h3 className={'text-32 font-playfair font-bold mb-1 md:text-40 md:my-[3px] 2xl:text-60'}>
              {details.title}
            </h3>
            <p className={'text-2xl font-inter font-medium text-text-muted 2xl:text-2xl'}>{details.original_title}</p>
          </div>
          <div className={'flex'}>
            <img
              src={setMovieDBPath(details.poster_path)}
              alt={details.title}
              className={'rounded-10 w-[63%] object-cover aspect-[230/310] md:hidden'}
            />
            <div className={'w-[37%] flex flex-col items-center gap-2 md:w-auto'}>
              <StarRating rating={details.vote_average} size="lg" />
              <p className={'text-xs text-white/60 text-center'}>
                {details.vote_count.toLocaleString()} {t('film.votes')}
              </p>
            </div>
          </div>
          <div>
            <div className={'mt-4 mb-11 md:my-4'}>{details.overview}</div>
            <Button variant={'transparent'} className={'flex items-center justify-center gap-[9px]'} onClick={onPlay}>
              <>
                <PlayIcon />
                <span>{t('film.watchTrailer')}</span>
              </>
            </Button>
          </div>
        </div>

        <div>
          <img
            src={setMovieDBPath(details.poster_path)}
            alt={details.title}
            className={'hidden rounded-10 object-cover aspect-[230/310] md:block md:max-w-[297px]'}
          />
          <div className={'flex items-center text-white gap-1 text-0.5rem'}>
            <IconBtn type={'like'} isActive={!!favouriteFilm?.status?.includes('liked')} onClick={onLike} />
            <IconBtn type={'dislike'} isActive={!!favouriteFilm?.status?.includes('disliked')} onClick={onDislike} />
            <IconBtn type={'heart'} isActive={!!favouriteFilm?.status?.includes('favourite')} onClick={onFavourite} />
          </div>
        </div>

        <MovieModal close={onCloseModal} isOpened={isModalOpen} videoKey={trailerKey} />
      </section>

      <section>
        <Description {...details} />
      </section>
    </>
  )
}
