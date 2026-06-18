import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Typography, TypographyTypes } from '../../../../components/ui/Typography/Typography'
import { FilmSlider } from '../../../../components/ui/sliders/FilmSlider/FilmSlider'
import { SliderNav } from '../../../../components/ui/sliders/SliderNav/SliderNav'
import { FilmSimilarSkeleton } from '../FilmSimilarSkeleton'
import type { IMovieRes } from '../../../../api/types'

interface FilmSimilarProps {
  slug: string
  similar: IMovieRes[]
  isLoading: boolean
}

export const FilmSimilar = memo(({ slug, similar, isLoading }: FilmSimilarProps) => {
  const { t } = useTranslation()
  const sliderName = `film-${slug}`

  return (
    <section>
      <Typography
        variant={'h3'}
        type={TypographyTypes._TITLE}
        className={'mx-auto mt-9 mb-[18px] md:mt-[52px] md:mb-9 2xl:mt-[73px] 2xl:mb-[42px] w-max'}
      >
        {t('film.similar')}
      </Typography>
      {isLoading ? (
        <FilmSimilarSkeleton />
      ) : (
        <>
          <FilmSlider slides={similar} name={sliderName} />
          <div className={'flex justify-center items-center mt-8'}>
            <SliderNav sliderName={sliderName} />
          </div>
        </>
      )}
    </section>
  )
})

FilmSimilar.displayName = 'FilmSimilar'
