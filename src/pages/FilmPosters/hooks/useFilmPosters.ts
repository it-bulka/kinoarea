import { useEffect, useState } from 'react'
import { getPosters, getMovieDetails } from '../../../api/movieDBApi'
import { IPoster, IMovieDetailsRes } from '../../../api/types/responses'

type FilmInfo = Pick<IMovieDetailsRes, 'title' | 'poster_path'>

interface UseFilmPostersResult {
  posters: IPoster[]
  film: FilmInfo | null
  isLoading: boolean
}

export const useFilmPosters = (slug: string): UseFilmPostersResult => {
  const [posters, setPosters] = useState<IPoster[]>([])
  const [film, setFilm] = useState<FilmInfo | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!slug) return
    setIsLoading(true)
    Promise.all([
      getPosters(slug).then(setPosters),
      getMovieDetails(slug).then(d => setFilm({ title: d.title, poster_path: d.poster_path })),
    ]).finally(() => setIsLoading(false))
  }, [slug])

  return { posters, film, isLoading }
}
