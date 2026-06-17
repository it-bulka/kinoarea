import { SectionHeader } from '../../../../components/ui/SectionHeader/SectionHeader'
import { FilmList } from '../../../../components/ui/FilmList/FilmList'
import { Button } from '../../../../components/ui/Button/Button'
import { useEffect, useMemo } from 'react'
import { useActions } from '../../../../hooks/useActions'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import { genres } from '../../../../mock/categories'
import { setActiveItem } from '../../../../utils/setActiveItem'
import { ICategory } from '../../../../components/ui/Category/Category'
import { useNavigate } from 'react-router-dom'
import { NowPlayingSkeleton } from './NowPlayingSkeleton'
import { useTranslation } from 'react-i18next'
import { useMainSectionReveal } from '../../hooks/useMainSectionReveal'

export const NowPlaying = () => {
  const { fetchNowPlayingMovies, changeNowPlayingCategory } = useActions()
  const { nowPlaying, nowPlayingCategory, isNowPlayingLoading } = useTypedSelector(state => state.movies)
  const navigate = useNavigate()
  const { t } = useTranslation()

  useEffect(() => {
    fetchNowPlayingMovies()
  }, [])

  const allMovies = useMemo(() => {
    /* NO ACCESS TO LIMIT LENGTH VIA MOVIEDB */
    const movies = [...nowPlaying]
    const moviesLimit = 10
    if (movies.length > moviesLimit) movies.length = moviesLimit
    return movies
  }, [nowPlaying])

  const translatedGenres = useMemo(() => genres.map(g => ({ ...g, title: t(`main.genres.${g.id}`) })), [t])

  const sectionRef = useMainSectionReveal({ aboveFold: true, deps: [allMovies] })

  if (isNowPlayingLoading) return <NowPlayingSkeleton />

  const onCategoryClick = (item: ICategory<string>) => {
    changeNowPlayingCategory(item)
    fetchNowPlayingMovies(item.param)
  }

  return (
    <section ref={sectionRef}>
      <SectionHeader
        title={t('main.nowPlaying')}
        categories={setActiveItem(translatedGenres, nowPlayingCategory.id)}
        onCategoryClick={onCategoryClick}
      />
      <FilmList list={allMovies} />
      <Button
        variant={'transparent'}
        className={'block mt-7 mb-8 mx-auto md:mt-8 md:mb-6 lg:mb-12 2xl:mt-12 2xl:mb-[54px]'}
        onClick={() =>
          navigate('collections/category', {
            state: { title: t('main.nowPlaying'), category: 'now_playing' },
          })
        }
      >
        {t('main.allNew')}
      </Button>
    </section>
  )
}
