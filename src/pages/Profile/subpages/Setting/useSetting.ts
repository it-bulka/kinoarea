import { FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Timestamp } from 'firebase/firestore'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import type { IUser, SexType } from '../../../../api/types/responses'
import { useActions } from '../../../../hooks/useActions'
import type { IOption } from '../../../../utils/getSelectedOption'
import type { SocialMedias } from '../../../../api/types/socialMedias'
import { ProfilePages } from '../../../../router/paths'
import type { Fields, SocialMediasType } from './constants'

const initialInfo: Fields = { name: '', surname: '', about: '', sex: 'notchosen' }
const initialSocials: SocialMediasType = { linkedin: '', youtube: '', instagram: '', twitter: '', facebook: '' }

export const useSetting = () => {
  const [info, setInfo] = useState<Fields>(initialInfo)
  const [socialMedias, setSocialMedias] = useState<SocialMediasType>(initialSocials)
  const [date, setDate] = useState<Date | null>(null)
  const [selectedImage, setSelectedImage] = useState<Blob | null>(null)
  const [err, setErr] = useState({ name: '', surname: '' })
  const { user, error } = useTypedSelector(state => state.user)
  const navigate = useNavigate()
  const { updateUser } = useActions()

  useEffect(() => {
    if (user) {
      const { name, surname, about, sex, links, birthday } = user
      setInfo({ name, surname, about, sex })
      links && setSocialMedias(links)
      birthday && setDate(birthday.toDate())
    }
  }, [user])

  const handleErr = (val: string, fieldName: 'name' | 'surname') => {
    const appropriateLength = val.length > 1
    let errText = ''
    if (!appropriateLength) errText = 'Нужно указать больше одної буквы'
    if (appropriateLength && err[fieldName]) errText = ''
    setErr(prev => ({ ...prev, [fieldName]: errText }))
  }

  function handleInput<T>(name: keyof Fields) {
    return (value: T) => {
      if (name === 'name' || name === 'surname') handleErr(value as string, name)
      setInfo(prev => ({ ...prev, [name]: value }))
    }
  }

  function handleSelect(selectedOptions: unknown) {
    const sex = (selectedOptions as IOption)?.value
    if (sex) setInfo(prev => ({ ...prev, sex: sex as SexType }))
  }

  function handleSocialMediasInput<T>(name: SocialMedias) {
    return (value: T) => {
      setSocialMedias(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleImageUpload = (e: FormEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0]
    if (!file) return
    setSelectedImage(file)
  }

  const getImgUrl = (file: Blob | MediaSource) => URL.createObjectURL(file)

  const submitForm = async (e: FormEvent) => {
    e.preventDefault()
    if (err.name || err.surname) return
    if (user) {
      const updatedUserData: Partial<IUser> = {
        ...info,
        links: socialMedias,
        birthday: date && Timestamp.fromDate(date),
      }
      for (const key in updatedUserData) {
        if (key !== 'name' && key !== 'surname' && updatedUserData[key as keyof IUser] === undefined) {
          delete updatedUserData[key as keyof IUser]
        }
      }
      await updateUser(user.id, updatedUserData, selectedImage)
      error && navigate(ProfilePages.main)
    }
  }

  return {
    info,
    socialMedias,
    date,
    setDate,
    selectedImage,
    err,
    user,
    handleInput,
    handleSelect,
    handleSocialMediasInput,
    handleImageUpload,
    getImgUrl,
    submitForm,
  }
}
