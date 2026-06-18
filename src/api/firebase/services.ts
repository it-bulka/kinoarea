import { addDoc, query, orderBy, limit } from 'firebase/firestore'
import { COLLECTIONS, getCollectionRef, getDocsInfo, getDocInfo } from './helpers'
import { INews } from '../types/news'

export const getNews = async (count?: number): Promise<INews[]> => {
  const colRef = getCollectionRef(COLLECTIONS.NEWS)
  const q = count ? query(colRef, orderBy('date', 'desc'), limit(count)) : query(colRef, orderBy('date', 'desc'))
  return await getDocsInfo<INews>(q)
}

export const getNewsItem = async (id: string): Promise<INews | null> => {
  return await getDocInfo(id, COLLECTIONS.NEWS)
}

export const addSubscription = async (email: string): Promise<void> => {
  await addDoc(getCollectionRef(COLLECTIONS.SUBSCRIPTIONS), { email })
}

export const trackDeletedImage = async (url: string, userId: string): Promise<void> => {
  const publicId =
    url
      .split('/upload/')[1]
      ?.split('?')[0]
      ?.replace(/^v\d+\//, '') || url
  await addDoc(getCollectionRef(COLLECTIONS.DELETED_IMAGES), {
    url,
    publicId,
    userId,
    deletedAt: new Date(),
  })
}

const CLOUDINARY_CLOUD = import.meta.env.VITE_CLOUDINARY_CLOUD
const CLOUDINARY_PRESET = import.meta.env.VITE_CLOUDINARY_PRESET
const CLOUDINARY_FOLDER = import.meta.env.VITE_CLOUDINARY_FOLDER

export const uploadProfileImg = async (id: string, file: Blob): Promise<string> => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', CLOUDINARY_PRESET)
  formData.append('folder', `${CLOUDINARY_FOLDER}/profiles`)
  formData.append('public_id', `${id}_${Date.now()}`)

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD}/image/upload`, {
    method: 'POST',
    body: formData,
  })

  if (!res.ok) throw new Error('Image upload failed')
  const data = await res.json()
  return data.secure_url
}
