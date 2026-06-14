import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ILoginFields, loginSchema } from '../../../../api/types/schemas'
import { Input } from '../../../ui/Input/Input'
import { Typography, TypographyTypes } from '../../../ui/Typography/Typography'
import { Button } from '../../../ui/Button/Button'
import { useActions } from '../../../../hooks/useActions'

interface LoginFormProps {
  onRegisterClick: () => void
}
export const LoginForm = ({ onRegisterClick }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  })
  const { fetchUser } = useActions()

  const onSubmit: SubmitHandler<ILoginFields> = async data => {
    const { login, password } = data
    fetchUser({ login, password })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={'form'}>
      <Typography variant={'h2'} type={TypographyTypes._TITLE} className={'mb-[34px] text-center'}>
        Войти
      </Typography>
      <Input register={register} name={'login'} error={errors?.login?.message} label={'Логин, почта или телефон'} />
      <Input register={register} name={'password'} error={errors?.password?.message} label={'Ваш пароль'} />
      <Button variant={'yellow'} type={'submit'} className={'w-full'}>
        Войти
      </Button>
      <button onClick={onRegisterClick} className={'form_link'}>
        Зарегистрироваться
      </button>
    </form>
  )
}
