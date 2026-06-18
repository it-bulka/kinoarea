import { useState, useCallback, useEffect, useRef } from 'react'
import { IUserReview } from '../../../../api/types/responses'
import { FirebaseApi } from '../../../../api/firebase'
import { type QueryDocumentSnapshot, type DocumentData } from 'firebase/firestore'
import { useActions } from '../../../../hooks/useActions'
import { notificationList } from '../../../../mock/notificationList'

const PAGE_SIZE = 40

export const useProfileComments = (userId: string | undefined) => {
  const [comments, setComments] = useState<IUserReview[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasMore, setHasMore] = useState(true)
  const lastDocRef = useRef<QueryDocumentSnapshot<DocumentData> | null>(null)
  const { setNotification } = useActions()

  useEffect(() => {
    if (!userId) return
    setIsLoading(true)
    setComments([])
    lastDocRef.current = null
    setHasMore(true)

    FirebaseApi.getUserReviewsPaginated(userId, PAGE_SIZE)
      .then(({ reviews, lastDoc }) => {
        setComments(reviews)
        lastDocRef.current = lastDoc
        setHasMore(reviews.length === PAGE_SIZE)
      })
      .catch(err => {
        console.error('Failed to load comments:', err)
        setHasMore(false)
      })
      .finally(() => setIsLoading(false))
  }, [userId])

  const loadMore = useCallback(async () => {
    if (!userId || !lastDocRef.current || isLoading) return
    setIsLoading(true)
    try {
      const { reviews, lastDoc } = await FirebaseApi.getUserReviewsPaginated(userId, PAGE_SIZE, lastDocRef.current)
      setComments(prev => [...prev, ...reviews])
      lastDocRef.current = lastDoc
      setHasMore(reviews.length === PAGE_SIZE)
    } finally {
      setIsLoading(false)
    }
  }, [userId, isLoading])

  const deleteComment = useCallback(
    async (reviewId: string) => {
      try {
        await FirebaseApi.deleteUserReview(reviewId)
        setComments(prev => prev.filter(r => r.id !== reviewId))
        setNotification(notificationList.commentDeleted)
      } catch {
        setNotification(notificationList.commentError)
      }
    },
    [setNotification]
  )

  return { comments, isLoading, hasMore, loadMore, deleteComment }
}
