import { useState, useCallback, useEffect, useRef } from 'react'
import { IUserReview } from '../../../api/types/responses'
import { FirebaseApi } from '../../../api/firebase'
import { type QueryDocumentSnapshot, type DocumentData } from 'firebase/firestore'

const PAGE_SIZE = 10

export const useMovieReviews = (movieId: string | undefined) => {
  const [movieReviews, setMovieReviews] = useState<IUserReview[]>([])
  const [isLoadingReviews, setIsLoadingReviews] = useState(false)
  const [hasMoreReviews, setHasMoreReviews] = useState(true)
  const lastDocRef = useRef<QueryDocumentSnapshot<DocumentData> | null>(null)

  useEffect(() => {
    if (!movieId) return
    setIsLoadingReviews(true)
    setMovieReviews([])
    lastDocRef.current = null
    setHasMoreReviews(true)

    FirebaseApi.getMovieReviews(movieId, PAGE_SIZE)
      .then(({ reviews, lastDoc }) => {
        setMovieReviews(reviews)
        lastDocRef.current = lastDoc
        setHasMoreReviews(reviews.length === PAGE_SIZE)
      })
      .catch(() => setHasMoreReviews(false))
      .finally(() => setIsLoadingReviews(false))
  }, [movieId])

  const loadMoreReviews = useCallback(async () => {
    if (!movieId || !lastDocRef.current || isLoadingReviews) return
    setIsLoadingReviews(true)
    try {
      const { reviews, lastDoc } = await FirebaseApi.getMovieReviews(movieId, PAGE_SIZE, lastDocRef.current)
      setMovieReviews(prev => [...prev, ...reviews])
      lastDocRef.current = lastDoc
      setHasMoreReviews(reviews.length === PAGE_SIZE)
    } finally {
      setIsLoadingReviews(false)
    }
  }, [movieId, isLoadingReviews])

  const prependReview = useCallback((review: IUserReview) => {
    setMovieReviews(prev => {
      if (prev.some(r => r.id === review.id)) return prev
      return [review, ...prev]
    })
  }, [])

  return { movieReviews, isLoadingReviews, hasMoreReviews, loadMoreReviews, prependReview }
}
