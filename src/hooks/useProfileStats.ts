import { useEffect, useState } from 'react'
import { FirebaseApi } from '../api/firebase'

export interface StatCounts {
  liked: number
  favourite: number
  reviews: number
}

const initialStats: StatCounts = { liked: 0, favourite: 0, reviews: 0 }

export const useProfileStats = (userId?: string): StatCounts => {
  const [stats, setStats] = useState<StatCounts>(initialStats)

  useEffect(() => {
    if (!userId) return

    Promise.all([
      FirebaseApi.getFavouriteFilms({ userId, filmStatus: 'liked' }),
      FirebaseApi.getFavouriteFilms({ userId, filmStatus: 'favourite' }),
      FirebaseApi.getUserReviews(userId),
    ]).then(([liked, favourite, reviews]) => {
      setStats({ liked: liked.length, favourite: favourite.length, reviews: reviews.length })
    })
  }, [userId])

  return stats
}
