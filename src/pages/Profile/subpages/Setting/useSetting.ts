import { FormEvent, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Timestamp } from 'firebase/firestore'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import type { IUser, SexType } from '../../../../api/types/responses'
import { useActions } from '../../../../hooks/useActions'
import type { IOption } from '../../../../utils/getSelectedOption'
import type { SocialMedias } from '../../../../api/types/socialMedias'
import { ProfilePages } from '../../../../router/paths'
import type { GenreId, GenreIds } from '../../../../mock/types'
import type { Fields, SocialMediasType } from './constants'

const initialInfo: Fields = { name: '', surname: '', about: '', sex: 'notchosen', country: undefined, city: undefined }
const initialSocials: SocialMediasType = { linkedin: '', youtube: '', instagram: '', twitter: '', facebook: '' }

export const useSetting = () => {
  const [info, setInfo] = useState<Fields>(initialInfo)
  const [socialMedias, setSocialMedias] = useState<SocialMediasType>(initialSocials)
  const [genres, setGenres] = useState<GenreIds>([])
  const [date, setDate] = useState<Date | null>(null)
  const [selectedImage, setSelectedImage] = useState<Blob | null>(null)
  const [err, setErr] = useState({ name: '', surname: '' })
  const { user } = useTypedSelector(state => state.user)
  const genreMovies = useTypedSelector(state => state.genres.movies)
  const navigate = useNavigate()
  const { updateUser } = useActions()

  const genreOptions = useMemo(() => {
    return genreMovies.map(g => ({ value: String(g.id), label: g.name }))
  }, [genreMovies])

  useEffect(() => {
    if (user) {
      const { name, surname, about, sex, links, birthday, country, city, genres: userGenres } = user
      setInfo({ name, surname, about, sex, country, city })
      links && setSocialMedias(links)
      birthday && setDate(birthday.toDate())
      userGenres && setGenres(userGenres)
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

  const handleGenresChange = (opts: unknown) => {
    const selected = opts as { value: string }[]
    setGenres((selected || []).map(o => Number(o.value) as GenreId))
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
        genres,
      }
      for (const key in updatedUserData) {
        if (key !== 'name' && key !== 'surname' && updatedUserData[key as keyof IUser] === undefined) {
          delete updatedUserData[key as keyof IUser]
        }
      }
      await updateUser(user.id, updatedUserData, selectedImage)
      navigate(ProfilePages.main)
    }
  }

  return {
    info,
    socialMedias,
    genres,
    genreOptions,
    date,
    setDate,
    selectedImage,
    err,
    user,
    handleInput,
    handleSelect,
    handleSocialMediasInput,
    handleGenresChange,
    handleImageUpload,
    getImgUrl,
    submitForm,
  }
}
