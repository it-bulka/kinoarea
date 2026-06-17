import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ILoginFields, loginSchema } from '../../../../api/types/schemas'
import { Input } from '../../../ui/Input/Input'
import { Typography, TypographyTypes } from '../../../ui/Typography/Typography'
import { Button } from '../../../ui/Button/Button'
import { useActions } from '../../../../hooks/useActions'
import { useTranslation } from 'react-i18next'
import { GoogleSignIn } from '../GoogleSignIn/GoogleSignIn'

interface LoginFormProps {
  onRegisterClick: () => void
  onForgotClick: () => void
}

export const LoginForm = ({ onRegisterClick, onForgotClick }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) })
  const { fetchUser } = useActions()
  const { t } = useTranslation()

  const onSubmit: SubmitHandler<ILoginFields> = ({ email, password }) => {
    fetchUser({ email, password })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={'form'}>
      <Typography variant={'h2'} type={TypographyTypes._TITLE} className={'mb-[34px] text-center'}>
        {t('auth.login.title')}
      </Typography>
      <Input
        register={register}
        name={'email'}
        type={'email'}
        error={errors?.email?.message}
        label={t('auth.login.emailLabel')}
      />
      <Input
        register={register}
        name={'password'}
        type={'password'}
        error={errors?.password?.message}
        label={t('auth.login.passwordLabel')}
      />
      <button
        type={'button'}
        onClick={onForgotClick}
        className={'self-end font-inter text-sm text-text-muted transition-colors hover:text-gold'}
      >
        {t('auth.login.forgot')}
      </button>
      <Button variant={'primary'} type={'submit'} className={'w-full'}>
        {t('auth.login.submit')}
      </Button>
      <GoogleSignIn />
      <button onClick={onRegisterClick} className={'form_link'}>
        {t('auth.login.register')}
      </button>
    </form>
  )
}
