import { db } from './base'
import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  type Query,
  type QuerySnapshot,
  type DocumentData,
} from 'firebase/firestore'

export enum COLLECTIONS {
  USERS = 'users',
  REVIEWS = 'reviews',
  FILMS = 'films',
  PERSONS = 'persons',
  NEWS = 'news',
  SUBSCRIPTIONS = 'subscriptions',
  DELETED_IMAGES = 'deletedImages',
}

export const getCollectionRef = (colName: COLLECTIONS) => collection(db, colName)

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
  const colRef = getCollectionRef(colName)
  return getDocsInfo<T>(colRef)
}

export async function getDocInfo<T>(id: string, colName: COLLECTIONS): Promise<T | null> {
  const docRef = doc(db, colName, id)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as T
  }
  return null
}

export async function updateDocInfo<T extends Record<string, any>>(id: string, colName: COLLECTIONS, data: T) {
  const docRef = doc(db, colName, id)
  await updateDoc(docRef, data)
}
