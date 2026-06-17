import { memo } from 'react'
import type { TFunction } from 'i18next'
import { Input } from '../../../../components/ui/Input/Input'
import type { SocialMedias } from '../../../../api/types/socialMedias'
import type { SocialMediasType, getSocialBtns } from './constants'
import cls from './Setting.module.scss'

type SocialBtn = ReturnType<typeof getSocialBtns>[number]

interface SettingSocialsProps {
  socialMedias: SocialMediasType
  handleSocialMediasInput: (name: SocialMedias) => (value: unknown) => void
  socialBtns: SocialBtn[]
  t: TFunction
}

export const SettingSocials = memo(({ socialMedias, handleSocialMediasInput, socialBtns, t }: SettingSocialsProps) => (
  <div className={cls.socialsCol}>
    <p className={cls.socialsTitle}>{t('settings.social.title')}</p>
    {socialBtns.map(item => (
      <Input
        key={item.id}
        addendum={
          <span className={cls.inputAddendum} style={{ background: item.bg }}>
            {item.icon}
          </span>
        }
        addendumLeft
        addendumFull
        name={item.name}
        placeholder={item.placeholder}
        value={socialMedias?.[item.name] || undefined}
        onChange={handleSocialMediasInput(item.name)}
      />
    ))}
  </div>
))
SettingSocials.displayName = 'SettingSocials'
