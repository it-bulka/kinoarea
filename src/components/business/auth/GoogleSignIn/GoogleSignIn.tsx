import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { ReactComponent as GoogleIcon } from '../../../../assets/images/general/google.svg'
import { useActions } from '../../../../hooks/useActions'

export const GoogleSignIn = memo(() => {
  const { signInWithGoogle } = useActions()
  const { t } = useTranslation()

  const handleClick = useCallback(() => {
    signInWithGoogle()
  }, [signInWithGoogle])

  return (
    <div className={'flex flex-col gap-4'}>
      <div className={'flex items-center gap-3'}>
        <span className={'h-px flex-1 bg-text-muted/20'} />
        <span className={'font-inter text-sm text-text-muted'}>{t('auth.divider')}</span>
        <span className={'h-px flex-1 bg-text-muted/20'} />
      </div>
      <button
        type={'button'}
        onClick={handleClick}
        aria-label={t('auth.google')}
        className={
          'flex w-full items-center justify-center gap-3 rounded-md border border-text-muted/20 bg-noir-soft px-4 py-3 font-inter text-sm text-text-base transition-colors hover:border-gold/40 hover:bg-noir-soft/80'
        }
      >
        <GoogleIcon className={'h-5 w-5 shrink-0'} />
        <span>{t('auth.google')}</span>
      </button>
    </div>
  )
})

GoogleSignIn.displayName = 'GoogleSignIn'
