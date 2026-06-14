import { db, storage } from './base'
import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  setDoc,
  addDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  documentId,
  arrayUnion,
  arrayRemove,
  type Query,
  type QuerySnapshot,
  type DocumentData,
} from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { IFriend, IUser, IUserReview } from '../types/responses'
import { INews } from '../types/news'
import { FirebaseEndpoints } from './endpoints'
import { IFbFavouriteMovie, IFilmStatus } from '../types/film'
import { IFbFavouritePerson } from '../types/person'

export enum COLLECTIONS {
  USERS = 'users',
  REVIEWS = 'reviews',
  FILMS = 'films',
  PERSONS = 'persons',
  NEWS = 'news',
}

const getCollectionRef = (colName: COLLECTIONS) => collection(db, colName)
export async function getDocsInfo<T>(ref: Query, fields?: string[]): Promise<T[]> {
  const docsSnapshot: QuerySnapshot<DocumentData, DocumentData> = await getDocs(ref)
  const allDocs: T[] = docsSnapshot.docs.map(doc => {
    const all = doc.data()
    let needed = all

    if (fields) {
      needed = {}
      fields.forEach(field => {
        needed[field] = all[field]
      })
    }
    return { ...needed, id: doc.id } as T
  })

  return allDocs
}

export async function getDocsInfoWithCol<T>(colName: COLLECTIONS): Promise<T[]> {
  const colRef = await getCollectionRef(colName)

  return getDocsInfo<T>(colRef)
}

async function getDocInfo<T>(id: string, colName: COLLECTIONS): Promise<T | null> {
  const docRef = doc(db, colName, id)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as T
  }
  return null
}

async function updateDocInfo<T extends Record<string, any>>(id: string, colName: COLLECTIONS, data: T) {
  const docRef = doc(db, colName, id)
  await updateDoc(docRef, data)
}

const getUser = async (id: string): Promise<IUser | null> => {
  return await getDocInfo(id, COLLECTIONS.USERS)
}

const createUser = async (userData: Pick<IUser, 'name' | 'surname' | 'id'>): Promise<IUser | null> => {
  const { id, ...rest } = userData
  const colRef = await getCollectionRef(COLLECTIONS.USERS)
  const docRef = doc(colRef, id)
  await setDoc(docRef, rest)
  return await getUser(docRef.id)
}

const refreshUser = async (id: string, data: Partial<IUser>): Promise<void> => {
  await updateDocInfo(id, COLLECTIONS.USERS, data)
}

const getUserReviews = async (userId: string): Promise<IUserReview[]> => {
  const q = query(getCollectionRef(COLLECTIONS.REVIEWS), where('userId', '==', userId))
  return await getDocsInfo<IUserReview>(q)
}

const setUserReview = async (review: Omit<IUserReview, 'id'>): Promise<void> => {
  const colRef = await getCollectionRef(COLLECTIONS.REVIEWS)
  await addDoc(colRef, review)
}

const getUserFriends = async (friendsId: string[]): Promise<IFriend[]> => {
  const q = query(getCollectionRef(COLLECTIONS.USERS), where(documentId(), 'in', friendsId))
  const d = await getDocsInfo<IFriend>(q, ['name', 'surname', 'img', 'friends'])

  return d
}

const addUserFriend = async (userId: string, friendId: string): Promise<void> => {
  const docRef = doc(db, COLLECTIONS.USERS, userId)
  await updateDoc(docRef, { friends: arrayUnion(friendId) })
}

const removeUserFriend = async (userId: string, friendId: string): Promise<void> => {
  const docRef = doc(db, COLLECTIONS.USERS, userId)
  await updateDoc(docRef, { friends: arrayRemove(friendId) })
}

const addIncomingFriend = async (userId: string, friendId: string | string[]): Promise<void> => {
  const docRef = doc(db, COLLECTIONS.USERS, userId)
  const friendIdsToAdd = Array.isArray(friendId) ? friendId : [friendId]
  await updateDoc(docRef, { incomingFriends: arrayUnion(...friendIdsToAdd) })
}

const removeIncomingFriend = async (userId: string, friendId: string): Promise<void> => {
  const docRef = doc(db, COLLECTIONS.USERS, userId)
  await updateDoc(docRef, { incomingFriends: arrayRemove(friendId) })
}

/* NEWS */

const getNews = async (count?: number): Promise<INews[]> => {
  const colRef = getCollectionRef(COLLECTIONS.NEWS)
  const q = count ? query(colRef, orderBy('date', 'desc'), limit(count)) : query(colRef, orderBy('date', 'desc'))
  return await getDocsInfo<INews>(q)
}

const getNewsItem = async (id: string): Promise<INews | null> => {
  return await getDocInfo(id, COLLECTIONS.NEWS)
}

/* FAVOURITE FILMS */
// TODO: remove
/*const addFavouriteFilm = async (userId: string, film: IFbFavouriteMovie): Promise<void> => {
  const docRef = doc(db, COLLECTIONS.USERS, userId)
  await updateDoc(docRef, { favouriteFilms: arrayUnion(film) })
}
}*/

// TODO: replace
/*const removeFavouriteFilm = async (userId: string, film: IFbFavouriteMovie): Promise<void> => {
  const docRef = doc(db, COLLECTIONS.USERS, userId)
  await updateDoc(docRef, { favouriteFilms: arrayRemove(film) })
}*/

const addFavouriteFilm = async ({
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

const removeFavouriteFilm = async ({ userId, filmId }: { userId: string; filmId: string }): Promise<void> => {
  const docRef = doc(db, COLLECTIONS.FILMS, userId, COLLECTIONS.FILMS, filmId)
  await deleteDoc(docRef)
}

const getFavouriteFilms = async ({
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

const getFavouriteFilm = async ({
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

const toggleFilmStatus = async ({
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

/* FAVOURITE PERSONS */

const addFavouritePerson = async ({
  userId,
  person,
}: {
  userId: string
  person: IFbFavouritePerson
}): Promise<void> => {
  const docRef = doc(db, COLLECTIONS.PERSONS, userId, COLLECTIONS.PERSONS, person.id.toString())
  await setDoc(docRef, person)
}

const removeFavouritePerson = async ({ userId, personId }: { userId: string; personId: string }): Promise<void> => {
  const docRef = doc(db, COLLECTIONS.PERSONS, userId, COLLECTIONS.PERSONS, personId)
  await deleteDoc(docRef)
}

const getFavouritePersons = async ({ userId }: { userId: string }): Promise<IFbFavouritePerson[]> => {
  const colRef = collection(db, COLLECTIONS.PERSONS, userId, COLLECTIONS.PERSONS)
  return await getDocsInfo<IFbFavouritePerson>(colRef)
}

/* STORAGE */

const uploadProfileImg = async (id: string, file: Blob): Promise<string> => {
  const storageRef = await ref(storage, `${FirebaseEndpoints.STORAGE_PROFILES}/${id}`)
  await uploadBytesResumable(storageRef, file)
  return await getDownloadURL(storageRef)
}

export const FirebaseApi = {
  getCollectionRef,
  getDocsInfo,
  getDocsInfoWithCol,
  getUser,
  getNews,
  getNewsItem,
  createUser,
  refreshUser,
  uploadProfileImg,
  getUserReviews,
  setUserReview,
  getUserFriends,
  addUserFriend,
  removeUserFriend,
  removeIncomingFriend,
  addIncomingFriend,
  addFavouriteFilm,
  removeFavouriteFilm,
  getFavouriteFilms,
  getFavouriteFilm,
  toggleFilmStatus,
  addFavouritePerson,
  removeFavouritePerson,
  getFavouritePersons,
}
