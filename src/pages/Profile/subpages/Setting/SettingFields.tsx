import { memo } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import type { TFunction } from 'i18next'
import { Input } from '../../../../components/ui/Input/Input'
import { Textarea } from '../../../../components/ui/Textarea/Textarea'
import { CustomSelect } from '../../../../components/ui/Select/Select'
import { DateInput } from '../../../../components/ui/DateInput/DateInput'
import { getSelectedOption } from '../../../../utils/getSelectedOption'
import type { SexType } from '../../../../api/types/responses'
import type { GenreId, GenreIds } from '../../../../mock/types'
import type { Fields } from './constants'
import cls from './Setting.module.scss'

interface SettingFieldsProps {
  info: Fields
  err: { name: string; surname: string }
  date: Date | null
  setDate: Dispatch<SetStateAction<Date | null>>
  handleInput: (name: keyof Fields) => (value: unknown) => void
  handleSelect: (opts: unknown) => void
  sexOptions: { value: SexType; label: string }[]
  genres: GenreIds
  genreOptions: { value: string; label: string }[]
  onGenresChange: (opts: unknown) => void
  t: TFunction
}

export const SettingFields = memo(
  ({
    info,
    err,
    date,
    setDate,
    handleInput,
    handleSelect,
    sexOptions,
    genres,
    genreOptions,
    onGenresChange,
    t,
  }: SettingFieldsProps) => (
    <div className={cls.fieldsCol}>
      <div className={cls.fieldGroup}>
        <label className={cls.fieldLabel}>{t('settings.name')}</label>
        <Input name="profile-name" value={info.name} onChange={handleInput('name')} error={err.name} />
      </div>

      <div className={cls.fieldGroup}>
        <label className={cls.fieldLabel}>{t('settings.surname')}</label>
        <Input
          name="profile-surname"
          value={info.surname || ''}
          onChange={handleInput('surname')}
          error={err.surname}
        />
      </div>

      <div className={cls.fieldGroup}>
        <label className={cls.fieldLabel}>{t('profile.sex')}</label>
        <div className="flex-1">
          <CustomSelect
            options={sexOptions}
            value={getSelectedOption(sexOptions, info?.sex || 'notchosen')}
            onChange={handleSelect}
          />
        </div>
      </div>

      <div className={cls.fieldGroup}>
        <label className={cls.fieldLabel}>{t('profile.birthday')}</label>
        <DateInput date={date} onChange={setDate} placeholderText={t('settings.birthday')} />
      </div>

      <div className={cls.fieldGroup}>
        <label className={cls.fieldLabel}>{t('profile.country')}</label>
        <Input name="profile-country" value={info.country || ''} onChange={handleInput('country')} />
      </div>

      <div className={cls.fieldGroup}>
        <label className={cls.fieldLabel}>{t('profile.city')}</label>
        <Input name="profile-city" value={info.city || ''} onChange={handleInput('city')} />
      </div>

      <div className={cls.fieldGroupTop}>
        <label className={cls.fieldLabel}>{t('settings.about')}</label>
        <Textarea
          placeholder={t('settings.about')}
          className={cls.textareaWrapper}
          value={info.about}
          onChange={handleInput('about') as (v: string) => void}
        />
      </div>

      <div className={cls.fieldGroup}>
        <label className={cls.fieldLabel}>{t('profile.favouriteGenres')}</label>
        <div className="flex-1">
          <CustomSelect
            isMulti
            withCustomOptions
            options={genreOptions}
            value={genreOptions.filter(o => genres.includes(Number(o.value) as GenreId))}
            onChange={onGenresChange}
          />
        </div>
      </div>
    </div>
  )
)
SettingFields.displayName = 'SettingFields'
