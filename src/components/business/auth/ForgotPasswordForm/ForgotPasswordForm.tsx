import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../../../../api/firebase/base'
import { IResetFields, resetSchema } from '../../../../api/types/schemas'
import { Input } from '../../../ui/Input/Input'
import { Typography, TypographyTypes } from '../../../ui/Typography/Typography'
import { Button } from '../../../ui/Button/Button'
import { useTranslation } from 'react-i18next'

export const ForgotPasswordForm = () => {
  const [isSent, setIsSent] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const { t } = useTranslation()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IResetFields>({ resolver: yupResolver(resetSchema) })

  const onSubmit: SubmitHandler<IResetFields> = async ({ email }) => {
    setSubmitError(null)
    try {
      await sendPasswordResetEmail(auth, email)
      setIsSent(true)
    } catch {
      setSubmitError(t('auth.reset.error'))
    }
  }

  if (isSent) {
    return (
      <div className={'form'}>
        <Typography variant={'h2'} type={TypographyTypes._TITLE} className={'mb-6 text-center'}>
          {t('auth.reset.successTitle')}
        </Typography>
        <p className={'text-center font-inter text-sm leading-relaxed text-text-muted'}>
          {t('auth.reset.successMessage')}
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={'form'}>
      <Typography variant={'h2'} type={TypographyTypes._TITLE} className={'mb-3 text-center md_h:mb-6'}>
        {t('auth.reset.title')}
      </Typography>
      <p className={'font-inter text-sm leading-relaxed text-text-muted'}>{t('auth.reset.description')}</p>
      <Input
        register={register}
        name={'email'}
        type={'email'}
        error={errors?.email?.message}
        label={t('auth.reset.emailLabel')}
      />
      {submitError && (
        <p role={'alert'} className={'text-center font-inter text-sm text-red-500'}>
          {submitError}
        </p>
      )}
      <Button variant={'primary'} type={'submit'} disabled={isSubmitting} className={'w-full'}>
        {t('auth.reset.submit')}
      </Button>
    </form>
  )
}
