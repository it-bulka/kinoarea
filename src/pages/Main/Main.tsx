import { useEffect } from 'react'
import { useActions } from '../../hooks/useActions'
import { NowPlaying } from './sections/NowPlaying/NowPlaying'
import { NewTrailers } from './sections/NewTrailers/NewTrailers'
import { Popular } from './sections/Popular/Popular'
import { Persons } from './sections/Persons/Persons'
import { News } from './sections/News/News'
import { Upcoming } from './sections/Upcoming/Upcoming'
import { Profit } from './sections/Profit/Profit'

export const Main = () => {
  const { fetchMovieGenres } = useActions()

  useEffect(() => {
    fetchMovieGenres()
  }, [])

  return (
    <>
      <div className={'container'}>
        <NowPlaying />
        <NewTrailers />
        <Popular />
        <Persons />
        <News />
      </div>

      <div className={'bg-noir'}>
        <Upcoming />
        <Profit />
      </div>
    </>
  )
}
