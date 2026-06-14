import { Typography, TypographyTypes } from '../../../../components/ui/Typography/Typography'
import { ReactComponent as CheckedIcon } from '../../../../assets/images/general/checked.svg'
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
import { sexOptions, socialBtns } from './constants'
import { useSetting } from './useSetting'

export const Setting = () => {
  const {
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
  } = useSetting()

  return (
    <>
      <div className={cls.titleWrapper}>
        <Typography variant="h2" type={TypographyTypes._TITLE}>
          Настройки профиля
        </Typography>
        <button className={cls.titleBtn} form="profile-form">
          <CheckedIcon className="w-[14.8px] md:w-[19px]" />
          <span>Сохранить</span>
        </button>
      </div>
      <form className={cls.form} id="profile-form" onSubmit={submitForm}>
        {selectedImage && <img src={getImgUrl(selectedImage)} alt={info.name} className={cls.img} />}
        {user?.img && !selectedImage && <img src={user?.img} alt={info.name} className={cls.img} />}
        {!user?.img && !selectedImage && <img src={Avatar} alt={'avatar'} className={twMerge(cls.img, 'avatar')} />}
        <div className={cls.inputsBlock}>
          <Input name="profile-name" label="Имя" value={info.name} onChange={handleInput('name')} error={err.name} />
          <Input
            name="profile-surname"
            label="Фамлия"
            value={info.surname || undefined}
            onChange={handleInput('surname')}
            error={err.surname}
          />
          <CustomSelect
            options={sexOptions}
            value={getSelectedOption(sexOptions, info?.sex || 'notchosen')}
            onChange={handleSelect}
          />
          <DateInput date={date} onChange={setDate} placeholderText={'Укажите дату рождения'} />
          <Textarea
            placeholder="Информация о себе"
            className={cls.textarea}
            value={info.about}
            onChange={handleInput('about')}
          />
        </div>
        <div className={cls.socialMediaBlock}>
          <FileInput
            data={
              <>
                <span className={'text-white/60'}>Фото профиля: </span>
                <span>{shortenFileName(selectedImage?.name) || ''}</span>
              </>
            }
            btnText="Загрузить"
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
              value={socialMedias?.[item.name] || undefined}
              onChange={handleSocialMediasInput(item.name)}
            />
          ))}
        </div>
      </form>
    </>
  )
}
