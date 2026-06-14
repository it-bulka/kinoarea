import { useState, useEffect } from 'react'
import { getMovieVideos } from '../api/movieDBApi'
import { getYoutubeThumbnail } from '../utils/getYoutubeThumbnail'
import { IMovieVideo } from '../api/types/responses'
import { IVideo } from '../api/types'

interface MovieRef {
  id: string
  title: string
}

const findYoutubeTrailer = (videos: IMovieVideo[]): IMovieVideo | undefined =>
  videos.find(v => v.site === 'YouTube' && v.type === 'Trailer') ?? videos.find(v => v.site === 'YouTube')

export const useVideoTrailers = (movies: MovieRef[]): IVideo[] => {
  const [trailers, setTrailers] = useState<IVideo[]>([])

  const moviesKey = movies.map(m => m.id).join(',')

  useEffect(() => {
    if (!movies.length) return

    let cancelled = false

    const fetchAll = async () => {
      const results = await Promise.all(
        movies.map(async ({ id, title }) => {
          try {
            const videos = await getMovieVideos(id)
            const trailer = findYoutubeTrailer(videos)
            if (!trailer) return null
            return { id, title, src: getYoutubeThumbnail(trailer.key) } satisfies IVideo
          } catch {
            return null
          }
        })
      )

      if (!cancelled) {
        setTrailers(results.filter((t): t is IVideo => t !== null))
      }
    }

    fetchAll()

    return () => {
      cancelled = true
    }
    // moviesKey стабілізує залежність: масив об'єктів → рядок IDs
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moviesKey])

  return trailers
}
