import { db } from './base'
import { doc, setDoc, arrayUnion, arrayRemove, updateDoc, documentId, where, query } from 'firebase/firestore'
import { COLLECTIONS, getCollectionRef, getDocInfo, getDocsInfo, updateDocInfo } from './helpers'
import { IFriend, IUser } from '../types/responses'

export const getUser = async (id: string): Promise<IUser | null> => {
  return await getDocInfo(id, COLLECTIONS.USERS)
}

export const createUser = async (
  userData: Pick<IUser, 'name' | 'id'> & { surname?: string | null }
): Promise<IUser | null> => {
  const { id, ...rest } = userData
  const colRef = getCollectionRef(COLLECTIONS.USERS)
  const docRef = doc(colRef, id)
  await setDoc(docRef, rest)
  return await getUser(docRef.id)
}

export const refreshUser = async (id: string, data: Partial<IUser>): Promise<void> => {
  await updateDocInfo(id, COLLECTIONS.USERS, data)
}

export const getUserFriends = async (friendsId: string[]): Promise<IFriend[]> => {
  const q = query(getCollectionRef(COLLECTIONS.USERS), where(documentId(), 'in', friendsId))
  return await getDocsInfo<IFriend>(q, ['name', 'surname', 'img', 'friends'])
}

export const addUserFriend = async (userId: string, friendId: string): Promise<void> => {
  const docRef = doc(db, COLLECTIONS.USERS, userId)
  await updateDoc(docRef, { friends: arrayUnion(friendId) })
}

export const removeUserFriend = async (userId: string, friendId: string): Promise<void> => {
  const docRef = doc(db, COLLECTIONS.USERS, userId)
  await updateDoc(docRef, { friends: arrayRemove(friendId) })
}

export const addIncomingFriend = async (userId: string, friendId: string | string[]): Promise<void> => {
  const docRef = doc(db, COLLECTIONS.USERS, userId)
  const friendIdsToAdd = Array.isArray(friendId) ? friendId : [friendId]
  await updateDoc(docRef, { incomingFriends: arrayUnion(...friendIdsToAdd) })
}

export const removeIncomingFriend = async (userId: string, friendId: string): Promise<void> => {
  const docRef = doc(db, COLLECTIONS.USERS, userId)
  await updateDoc(docRef, { incomingFriends: arrayRemove(friendId) })
}
