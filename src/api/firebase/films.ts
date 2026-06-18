import { db } from './base'
import { collection, doc, getDoc, setDoc, deleteDoc, query, where } from 'firebase/firestore'
import { COLLECTIONS, getDocsInfo } from './helpers'
import { IFbFavouriteMovie, IFilmStatus } from '../types/film'

export const addFavouriteFilm = async ({
  userId,
  film,
  filmStatus,
}: {
  userId: string
  film: Omit<IFbFavouriteMovie, 'status'>
  filmStatus: IFilmStatus
}): Promise<void> => {
  const docRef = doc(db, COLLECTIONS.FILMS, userId, COLLECTIONS.FILMS, film.id.toString())
  await setDoc(docRef, { ...film, status: [filmStatus] })
}

export const removeFavouriteFilm = async ({ userId, filmId }: { userId: string; filmId: string }): Promise<void> => {
  const docRef = doc(db, COLLECTIONS.FILMS, userId, COLLECTIONS.FILMS, filmId)
  await deleteDoc(docRef)
}

export const getFavouriteFilms = async ({
  userId,
  filmStatus,
}: {
  userId: string
  filmStatus: IFilmStatus | IFilmStatus[]
}): Promise<IFbFavouriteMovie[]> => {
  const colRef = collection(db, COLLECTIONS.FILMS, userId, COLLECTIONS.FILMS)
  const statusArray = Array.isArray(filmStatus) ? filmStatus : [filmStatus]
  const q =
    statusArray.length === 1
      ? query(colRef, where('status', 'array-contains', statusArray[0]))
      : query(colRef, where('status', 'array-contains-any', statusArray))
  return await getDocsInfo<IFbFavouriteMovie>(q)
}

export const getFavouriteFilm = async ({
  userId,
  filmId,
  filmStatus,
}: {
  userId: string
  filmId: string
  filmStatus?: IFilmStatus
}): Promise<IFbFavouriteMovie | null> => {
  const docRef = doc(db, COLLECTIONS.FILMS, userId, COLLECTIONS.FILMS, filmId)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    const data = { id: docSnap.id, ...docSnap.data() } as unknown as IFbFavouriteMovie
    if (filmStatus && !data.status?.includes(filmStatus)) return null
    return data
  }
  return null
}

export const toggleFilmStatus = async ({
  userId,
  film,
  filmStatus,
}: {
  userId: string
  film: Omit<IFbFavouriteMovie, 'status'>
  filmStatus: IFilmStatus
}): Promise<IFbFavouriteMovie | null> => {
  const docRef = doc(db, COLLECTIONS.FILMS, userId, COLLECTIONS.FILMS, film.id.toString())
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    const existing = { id: docSnap.id, ...docSnap.data() } as unknown as IFbFavouriteMovie
    const newStatuses = existing.status.includes(filmStatus)
      ? existing.status.filter(s => s !== filmStatus)
      : [...existing.status, filmStatus]

    if (newStatuses.length === 0) {
      await deleteDoc(docRef)
      return null
    }

    const updated = { ...existing, status: newStatuses }
    await setDoc(docRef, updated)
    return updated
  }

  const created: IFbFavouriteMovie = { ...film, status: [filmStatus] } as IFbFavouriteMovie
  await setDoc(docRef, created)
  return created
}
