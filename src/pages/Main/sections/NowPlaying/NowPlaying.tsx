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

export const NowPlaying = () => {
  const { fetchNowPlayingMovies, changeNowPlayingCategory } = useActions()
  const { nowPlaying, nowPlayingCategory, isNowPlayingLoading } = useTypedSelector(state => state.movies)
  const navigate = useNavigate()

  useEffect(() => {
    fetchNowPlayingMovies()
  }, [])

  const allMovies = useMemo(() => {
    /* NO ACCESS TO LIMIT LENGTH VIA MOVIEDB */
    const movies = [...nowPlaying]
    const moviesLimit = 6
    if (movies.length > moviesLimit) movies.length = moviesLimit
    return movies
  }, [nowPlaying])

  if (isNowPlayingLoading) return <NowPlayingSkeleton />

  const onCategoryClick = (item: ICategory<string>) => {
    changeNowPlayingCategory(item)
    fetchNowPlayingMovies(item.param)
  }

  return (
    <section>
      <SectionHeader
        title={'Сейчас в кино'}
        categories={setActiveItem(genres, nowPlayingCategory.id)}
        onCategoryClick={onCategoryClick}
      />
      <FilmList list={allMovies} />
      <Button
        variant={'transparent'}
        className={'block mt-7 mb-8 mx-auto md:mt-8 md:mb-6 lg:mb-12 2xl:mt-12 2xl:mb-[54px]'}
        onClick={() =>
          navigate('collections/category', {
            state: { title: 'Сейчас в кино', category: 'now_playing' },
          })
        }
      >
        Все новинки
      </Button>
    </section>
  )
}
