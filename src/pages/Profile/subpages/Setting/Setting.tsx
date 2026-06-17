import { useMemo } from 'react'
import { Typography, TypographyTypes } from '../../../../components/ui/Typography/Typography'
import { ReactComponent as CheckedIcon } from '../../../../assets/images/general/checked.svg'
import { Spinner } from '../../../../components/ui/Spinner/Spinner'
import cls from '../../Profile.module.scss'
import { Input } from '../../../../components/ui/Input/Input'
import { Textarea } from '../../../../components/ui/Textarea/Textarea'
import { CustomSelect } from '../../../../components/ui/Select/Select'
import { DateInput } from '../../../../components/ui/DateInput/DateInput'
import { FileInput } from '../../../../components/ui/FileInput/FileInput'
import { shortenFileName } from '../../../../utils/shortenFileName'
import { twMerge } from 'tailwind-merge'
import Avatar from '../../../../assets/images/general/avatar.svg'
import { getSelectedOption } from '../../../../utils/getSelectedOption'
import type { GenreId } from '../../../../mock/types'
import { getSexOptions, getSocialBtns } from './constants'
import { useSetting } from './useSetting'
import { useTranslation } from 'react-i18next'

export const Setting = () => {
  const { t } = useTranslation()
  const sexOptions = useMemo(() => getSexOptions(t), [t])
  const socialBtns = useMemo(() => getSocialBtns(t), [t])

  const {
    info,
    socialMedias,
    genres,
    genreOptions,
    date,
    setDate,
    selectedImage,
    err,
    user,
    hasChanges,
    loading,
    handleInput,
    handleSelect,
    handleSocialMediasInput,
    handleGenresChange,
    handleImageUpload,
    getImgUrl,
    submitForm,
  } = useSetting()

  return (
    <>
      <div className={cls.titleWrapper}>
        <Typography variant="h2" type={TypographyTypes._TITLE}>
          {t('settings.title')}
        </Typography>
        <button className={cls.titleBtn} form="profile-form" disabled={!hasChanges || loading}>
          {loading ? (
            <Spinner className="w-[14.8px] md:w-[19px]" />
          ) : (
            <CheckedIcon className="w-[14.8px] md:w-[19px]" />
          )}
          <span>{loading ? t('settings.saving') : t('settings.save')}</span>
        </button>
      </div>
      <form className={cls.form} id="profile-form" onSubmit={submitForm}>
        <div className={cls.imgWrapper}>
          {selectedImage && <img src={getImgUrl(selectedImage)} alt={info.name} className={cls.img} />}
          {user?.img && !selectedImage && <img src={user?.img} alt={info.name} className={cls.img} />}
          {!user?.img && !selectedImage && <img src={Avatar} alt={'avatar'} className={twMerge(cls.img, 'avatar')} />}
        </div>
        <div className={cls.inputsBlock}>
          <Input
            name="profile-name"
            label={t('settings.name')}
            value={info.name}
            onChange={handleInput('name')}
            error={err.name}
          />
          <Input
            name="profile-surname"
            label={t('settings.surname')}
            value={info.surname || ''}
            onChange={handleInput('surname')}
            error={err.surname}
          />
          <CustomSelect
            options={sexOptions}
            value={getSelectedOption(sexOptions, info?.sex || 'notchosen')}
            onChange={handleSelect}
          />
          <DateInput date={date} onChange={setDate} placeholderText={t('settings.birthday')} />
          <Input
            name="profile-country"
            label={t('profile.country')}
            value={info.country || ''}
            onChange={handleInput('country')}
          />
          <Input name="profile-city" label={t('profile.city')} value={info.city || ''} onChange={handleInput('city')} />
          <CustomSelect
            isMulti
            withCustomOptions
            options={genreOptions}
            value={genreOptions.filter(o => genres.includes(Number(o.value) as GenreId))}
            onChange={handleGenresChange}
          />
          <Textarea
            placeholder={t('settings.about')}
            className={cls.textarea}
            value={info.about}
            onChange={handleInput('about')}
          />
        </div>
        <div className={cls.socialMediaBlock}>
          <FileInput
            data={
              <>
                <span className={'text-white/60'}>{t('settings.photo')}</span>
                <span>{shortenFileName(selectedImage?.name) || ''}</span>
              </>
            }
            btnText={t('settings.upload')}
            name="img"
            accept="image/*"
            onChange={handleImageUpload}
          />
          {socialBtns.map(item => (
            <Input
              addendum={
                <span className={cls.inputAddendum} style={{ background: item.bg }}>
                  {item.icon}
                </span>
              }
              addendumLeft
              addendumFull
              name={item.name}
              placeholder={item.placeholder}
              key={item.id}
              value={socialMedias?.[item.name] || ''}
              onChange={handleSocialMediasInput(item.name)}
            />
          ))}
        </div>
      </form>
    </>
  )
}
