import { useEffect } from 'react'
import { useActions } from '../../hooks/useActions'
import { WithErrorBoundary } from '../../components/ui/ErrorFallback'
import { NowPlaying } from './sections/NowPlaying/NowPlaying'
import { NewTrailers } from './sections/NewTrailers/NewTrailers'
import { Popular } from './sections/Popular/Popular'
import { Persons } from './sections/Persons/Persons'
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
        <WithErrorBoundary>
          <NowPlaying />
        </WithErrorBoundary>
        <WithErrorBoundary>
          <NewTrailers />
        </WithErrorBoundary>
        <WithErrorBoundary>
          <Popular />
        </WithErrorBoundary>
        <WithErrorBoundary>
          <Persons />
        </WithErrorBoundary>
      </div>

      <div className={'bg-noir'}>
        <WithErrorBoundary>
          <Upcoming />
        </WithErrorBoundary>
        <WithErrorBoundary>
          <Profit />
        </WithErrorBoundary>
      </div>
    </>
  )
}
