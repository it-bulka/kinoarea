import { Modal, ModalProps } from '../Modal/Modal'
import { RegisterForm } from '../../../business/auth/RegisterForm/RegisterForm'
import { LoginForm } from '../../../business/auth/LoginForm/LoginForm'
import { ForgotPasswordForm } from '../../../business/auth/ForgotPasswordForm/ForgotPasswordForm'
import { memo, useCallback, useMemo, useState } from 'react'
import { ReactComponent as BackIcon } from '../../../../assets/images/general/back-arrow.svg'

type FormTypes = 'login' | 'register' | 'reset'

type AuthModalProps = Omit<ModalProps, 'children'> & { formType?: FormTypes }
export const AuthModal = memo((props: AuthModalProps) => {
  const [formType, setFormType] = useState<FormTypes>(props.formType || 'login')

  const forms = useMemo(
    () => ({
      register: (
        <>
          <button className={'absolute top-0 left-0 py-5 px-6'} onClick={() => setFormType('login')}>
            <BackIcon className={'w-[20px] h-[20px]'} />
          </button>
          <RegisterForm />
        </>
      ),
      login: <LoginForm onRegisterClick={() => setFormType('register')} onForgotClick={() => setFormType('reset')} />,
      reset: (
        <>
          <button className={'absolute top-0 left-0 py-5 px-6'} onClick={() => setFormType('login')}>
            <BackIcon className={'w-[20px] h-[20px]'} />
          </button>
          <ForgotPasswordForm />
        </>
      ),
    }),
    []
  )
  const handleClose = useCallback(() => {
    setFormType('login')
    props.close?.()
  }, [props])
  return (
    <Modal {...props} close={handleClose}>
      {forms[formType]}
    </Modal>
  )
})

AuthModal.displayName = 'AuthModal'
