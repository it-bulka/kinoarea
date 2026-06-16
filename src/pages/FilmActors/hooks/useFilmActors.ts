import { useEffect, useState } from 'react'
import { getCast, getMovieDetails } from '../../../api/movieDBApi'
import { ICastRes, IMovieDetailsRes } from '../../../api/types/responses'

type FilmInfo = Pick<IMovieDetailsRes, 'title' | 'poster_path'>

interface UseFilmActorsResult {
  cast: ICastRes[]
  film: FilmInfo | null
  isLoading: boolean
}

export const useFilmActors = (slug: string): UseFilmActorsResult => {
  const [cast, setCast] = useState<ICastRes[]>([])
  const [film, setFilm] = useState<FilmInfo | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!slug) return
    setIsLoading(true)
    Promise.all([
      getCast(slug).then(setCast),
      getMovieDetails(slug).then(d => setFilm({ title: d.title, poster_path: d.poster_path })),
    ]).finally(() => setIsLoading(false))
  }, [slug])

  return { cast, film, isLoading }
}
