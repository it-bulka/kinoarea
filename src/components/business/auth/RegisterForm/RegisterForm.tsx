import { Input } from '../../../ui/Input/Input'
import { Typography, TypographyTypes } from '../../../ui/Typography/Typography'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { IRegisterFields, RegisterFields, registerSchemas } from '../../../../api/types/schemas'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '../../../ui/Button/Button'
import { Checkbox } from '../../../ui/Checkbox/Checkbox'
import { Link } from 'react-router-dom'
import { useActions } from '../../../../hooks/useActions'
import { useTranslation } from 'react-i18next'

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(registerSchemas),
  })
  const { createUser, setAuthBy } = useActions()
  const { t } = useTranslation()

  const fields: { id: string; name: RegisterFields & string; label: string }[] = [
    { id: '1', name: 'name', label: t('auth.register.name') },
    { id: '2', name: 'surname', label: t('auth.register.surname') },
    { id: '3', name: 'login', label: t('auth.register.login') },
    { id: '4', name: 'password', label: t('auth.register.password') },
    { id: '5', name: 'repeatPassword', label: t('auth.register.repeatPassword') },
    { id: '6', name: 'tel', label: t('auth.register.tel') },
  ]

  const onSubmit: SubmitHandler<IRegisterFields> = data => {
    const { name, surname, password, login } = data
    createUser({ name, surname, password, login })
    setAuthBy('register')
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={'form'}>
      <Typography variant={'h2'} type={TypographyTypes._TITLE} className={'mb:3 text-center md_h:mb-6'}>
        {t('auth.register.title')}
      </Typography>
      {fields.map(field => (
        <Input
          label={field.label}
          name={field.name}
          register={register}
          error={errors[field.name]?.message}
          key={field.id}
        />
      ))}
      <div className={'flex flex-col gap-[9px]'}>
        <Controller
          name={'privacy_policy'}
          control={control}
          defaultValue={true}
          render={({ field }) => (
            <Checkbox
              label={
                <p>
                  {t('auth.register.privacy')}
                  <Link to={'/'} className={'text-yellowish'}>
                    {t('auth.register.privacyLink')}
                  </Link>
                </p>
              }
              isChecked={!!field.value}
              onChange={data => field.onChange(data)}
              name={'privacy_policy'}
            />
          )}
        />

        <Controller
          name={'personal_data'}
          control={control}
          defaultValue={true}
          render={({ field }) => (
            <Checkbox
              label={t('auth.register.personalData')}
              isChecked={!!field.value}
              onChange={field.onChange}
              name={'personal_data'}
            />
          )}
        />
      </div>
      <Button variant={'yellow'} type={'submit'} className={'w-full'}>
        {t('auth.register.submit')}
      </Button>
    </form>
  )
}
