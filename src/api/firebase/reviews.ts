import { db } from './base'
import {
  getDocs,
  doc,
  addDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  type QueryDocumentSnapshot,
  type DocumentData,
} from 'firebase/firestore'
import { COLLECTIONS, getCollectionRef, getDocsInfo } from './helpers'
import { IUserReview } from '../types/responses'

export const getUserReviews = async (userId: string): Promise<IUserReview[]> => {
  const q = query(getCollectionRef(COLLECTIONS.REVIEWS), where('userId', '==', userId))
  return await getDocsInfo<IUserReview>(q)
}

export const getUserReviewsPaginated = async (
  userId: string,
  pageSize: number = 40,
  lastDoc?: QueryDocumentSnapshot<DocumentData>
): Promise<{ reviews: IUserReview[]; lastDoc: QueryDocumentSnapshot<DocumentData> | null }> => {
  const colRef = getCollectionRef(COLLECTIONS.REVIEWS)
  const q = lastDoc
    ? query(colRef, where('userId', '==', userId), orderBy('created_at', 'desc'), startAfter(lastDoc), limit(pageSize))
    : query(colRef, where('userId', '==', userId), orderBy('created_at', 'desc'), limit(pageSize))
  const snapshot = await getDocs(q)
  const reviews = snapshot.docs.map(d => ({ ...d.data(), id: d.id }) as IUserReview)
  const newLastDoc = snapshot.docs.length > 0 ? snapshot.docs[snapshot.docs.length - 1] : null
  return { reviews, lastDoc: newLastDoc }
}

export const getMovieReviews = async (
  movieId: string | number,
  pageSize: number = 10,
  lastDoc?: QueryDocumentSnapshot<DocumentData>
): Promise<{ reviews: IUserReview[]; lastDoc: QueryDocumentSnapshot<DocumentData> | null }> => {
  const colRef = getCollectionRef(COLLECTIONS.REVIEWS)
  const q = lastDoc
    ? query(
        colRef,
        where('movie.id', '==', Number(movieId)),
        orderBy('created_at', 'desc'),
        startAfter(lastDoc),
        limit(pageSize)
      )
    : query(colRef, where('movie.id', '==', Number(movieId)), orderBy('created_at', 'desc'), limit(pageSize))
  const snapshot = await getDocs(q)
  const reviews = snapshot.docs.map(d => ({ ...d.data(), id: d.id }) as IUserReview)
  const newLastDoc = snapshot.docs.length > 0 ? snapshot.docs[snapshot.docs.length - 1] : null
  return { reviews, lastDoc: newLastDoc }
}

export const setUserReview = async (review: Omit<IUserReview, 'id'>): Promise<IUserReview> => {
  const colRef = getCollectionRef(COLLECTIONS.REVIEWS)
  const docRef = await addDoc(colRef, review)
  return { ...review, id: docRef.id } as IUserReview
}

export const deleteUserReview = async (reviewId: string): Promise<void> => {
  const docRef = doc(db, COLLECTIONS.REVIEWS, reviewId)
  await deleteDoc(docRef)
}
