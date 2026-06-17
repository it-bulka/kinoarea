import { Input } from '../../../ui/Input/Input'
import { Typography, TypographyTypes } from '../../../ui/Typography/Typography'
import { useForm, SubmitHandler } from 'react-hook-form'
import { IRegisterFields, RegisterFields, registerSchemas } from '../../../../api/types/schemas'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '../../../ui/Button/Button'
import { useActions } from '../../../../hooks/useActions'
import { useTranslation } from 'react-i18next'
import { GoogleSignIn } from '../GoogleSignIn/GoogleSignIn'

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registerSchemas) })
  const { createUser, setAuthBy } = useActions()
  const { t } = useTranslation()

  const fields: { id: string; name: RegisterFields; label: string; type: string }[] = [
    { id: '1', name: 'name', label: t('auth.register.name'), type: 'text' },
    { id: '2', name: 'email', label: t('auth.register.email'), type: 'email' },
    { id: '3', name: 'password', label: t('auth.register.password'), type: 'password' },
    { id: '4', name: 'repeatPassword', label: t('auth.register.repeatPassword'), type: 'password' },
  ]

  const onSubmit: SubmitHandler<IRegisterFields> = ({ name, email, password }) => {
    createUser({ name, email, password })
    setAuthBy('register')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={'form'}>
      <Typography variant={'h2'} type={TypographyTypes._TITLE} className={'mb:3 text-center md_h:mb-6'}>
        {t('auth.register.title')}
      </Typography>
      {fields.map(field => (
        <Input
          key={field.id}
          label={field.label}
          name={field.name}
          type={field.type}
          register={register}
          error={errors[field.name]?.message}
        />
      ))}
      <Button variant={'primary'} type={'submit'} className={'w-full'}>
        {t('auth.register.submit')}
      </Button>
      <GoogleSignIn />
    </form>
  )
}
