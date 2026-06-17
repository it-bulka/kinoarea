import * as yup from 'yup'

export type RegisterFields = 'name' | 'email' | 'password' | 'repeatPassword'
export type IRegisterFields = { [K in RegisterFields]: string }

const commonFields = {
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
}

export const registerSchemas = yup.object({
  ...commonFields,
  name: yup.string().required('Name is required'),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please, repeat password'),
})

export interface ILoginFields {
  email: string
  password: string
}

export const loginSchema = yup.object({
  ...commonFields,
})

export interface IResetFields {
  email: string
}

export const resetSchema = yup.object({
  email: commonFields.email,
})
