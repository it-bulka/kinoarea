import { memo } from 'react'
import type { FormEvent } from 'react'
import type { TFunction } from 'i18next'
import { twMerge } from 'tailwind-merge'
import { FileInput } from '../../../../components/ui/FileInput/FileInput'
import { shortenFileName } from '../../../../utils/shortenFileName'
import Avatar from '../../../../assets/images/general/avatar.svg'
import type { IUser } from '../../../../api/types/responses'
import cls from './Setting.module.scss'

interface SettingAvatarProps {
  user: IUser | null
  selectedImage: File | null
  onUpload: (e: FormEvent<HTMLInputElement>) => void
  getImgUrl: (f: File | MediaSource) => string
  t: TFunction
}

export const SettingAvatar = memo(({ user, selectedImage, onUpload, getImgUrl, t }: SettingAvatarProps) => {
  const src = selectedImage ? getImgUrl(selectedImage) : user?.img || Avatar
  const isDefault = !selectedImage && !user?.img

  return (
    <div className={cls.avatarCol}>
      <img src={src} alt={user?.name || 'avatar'} className={twMerge(cls.avatarImg, isDefault ? 'avatar' : '')} />
      <FileInput
        data={
          <>
            <span className="text-white/60">{t('settings.photo')}</span>
            <span>{shortenFileName(selectedImage?.name) || ''}</span>
          </>
        }
        btnText={t('settings.upload')}
        name="img"
        accept="image/*"
        onChange={onUpload}
      />
    </div>
  )
})
SettingAvatar.displayName = 'SettingAvatar'
