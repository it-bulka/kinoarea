import { useEffect, useState } from 'react'
import { getMovieVideos, getMovieDetails } from '../../../api/movieDBApi'
import { IMovieVideo, IMovieDetailsRes } from '../../../api/types/responses'

type FilmInfo = Pick<IMovieDetailsRes, 'title' | 'poster_path'>

interface UseFilmVideosResult {
  videos: IMovieVideo[]
  film: FilmInfo | null
  isLoading: boolean
}

export const useFilmVideos = (slug: string): UseFilmVideosResult => {
  const [videos, setVideos] = useState<IMovieVideo[]>([])
  const [film, setFilm] = useState<FilmInfo | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!slug) return
    setIsLoading(true)
    Promise.all([
      getMovieVideos(slug).then(vids => setVideos(vids.filter(v => v.site === 'YouTube'))),
      getMovieDetails(slug).then(d => setFilm({ title: d.title, poster_path: d.poster_path })),
    ]).finally(() => setIsLoading(false))
  }, [slug])

  return { videos, film, isLoading }
}
