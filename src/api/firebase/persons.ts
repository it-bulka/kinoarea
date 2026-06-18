import { db } from './base'
import { collection, doc, setDoc, deleteDoc } from 'firebase/firestore'
import { COLLECTIONS, getDocsInfo } from './helpers'
import { IFbFavouritePerson } from '../types/person'

export const addFavouritePerson = async ({
  userId,
  person,
}: {
  userId: string
  person: IFbFavouritePerson
}): Promise<void> => {
  const docRef = doc(db, COLLECTIONS.PERSONS, userId, COLLECTIONS.PERSONS, person.id.toString())
  await setDoc(docRef, person)
}

export const removeFavouritePerson = async ({
  userId,
  personId,
}: {
  userId: string
  personId: string
}): Promise<void> => {
  const docRef = doc(db, COLLECTIONS.PERSONS, userId, COLLECTIONS.PERSONS, personId)
  await deleteDoc(docRef)
}

export const getFavouritePersons = async ({ userId }: { userId: string }): Promise<IFbFavouritePerson[]> => {
  const colRef = collection(db, COLLECTIONS.PERSONS, userId, COLLECTIONS.PERSONS)
  return await getDocsInfo<IFbFavouritePerson>(colRef)
}
