import React, { useState, useEffect } from 'react'
import { createStyles, TextInput, Select } from '@mantine/core'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from 'firebase/auth'

import { firebaseAuth } from 'src/auth/initFirebase'
import Layout from 'src/components/Layout'
import Wrapper from 'src/components/Wrapper'
import PasswordField from 'src/components/PasswordField'
import { PrimaryButton } from 'src/components/Button'
import Loading from 'src/components/Loading'

const sources = [
  'Referred by my client',
  'Referred by a friend',
  'Instagram',
  'Facebook',
  'Google',
  'App store',
  'Other',
]

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
  },

  input: {
    height: 'auto',
    paddingTop: 18,
    marginTop: 10,
  },

  label: {
    position: 'absolute',
    pointerEvents: 'none',
    fontSize: theme.fontSizes.xs,
    paddingLeft: theme.spacing.sm,
    paddingTop: theme.spacing.sm / 2,
    zIndex: 1,
  },
}))

const Form = styled.form`
  width: min(50ch, 100%);
  margin: 0 auto;
`
const H4 = styled.h4`
  padding: 0.5rem 0;
  color: var(--color-primary);
`

const H3 = styled.h3`
  padding: 0.5rem 0;
`
const Submit = styled.div`
  width: 100%;
  margin: 2rem 0;
  text-align: center;
`

const ErrorMessage = styled.span`
  color: var(--color-error);
  background: var(--color-error-background);
  width: 100%;
  padding: 0 1rem;
  margin: 0.5rem 0rem;
  display: block;
`

interface IFormData {
  email: string
  password: string
  confirmPwd: string
  lastName: string
  firstName: string
  phoneNumber: string
  marketingStrategy: string
}

const ProSignup = () => {
  const router = useRouter()
  const { classes } = useStyles()
  const [firebaseError, setFirebaseError] = useState()
  const [loading, setLoading] = useState(false)
  const [marketingStrategy, setMarketingStrategy] = useState<string | null>(
    null,
  )

  const formSchema = Yup.object().shape({
    email: Yup.string().email().required('Email is mandatory'),
    firstName: Yup.string().required('First name is mandatory'),
    lastName: Yup.string().required('Last name is mandatory'),
    phoneNumber: Yup.string().required('Phone number is mandatory'),
    password: Yup.string()
      .required('Password is mandatory')
      .min(3, 'Password must be at 3 char long'),
    confirmPwd: Yup.string()
      .required('Password is mandatory')
      .oneOf([Yup.ref('password')], 'Passwords does not match'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IFormData>({ resolver: yupResolver(formSchema), mode: 'onBlur' })

  const password = watch('password')
  const confirmPassword = watch('confirmPwd')

  useEffect(() => {
    register('email')
    register('password')
    register('confirmPwd')
    register('phoneNumber')
    register('lastName')
    register('firstName')
    register('marketingStrategy')
  }, [register])

  const signUpViaFirebase = (email: string, password: string) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password)
  }

  const handleError = (errors: any) => {
    console.error('errors :>> ', errors)
  }

  const createBusiness = (data: IFormData, firebaseID?: string) => {
    const { firstName, lastName, email, phoneNumber } = data
    return fetch('/api/create-business', {
      method: 'POST',
      body: JSON.stringify({
        data: {
          firstName,
          lastName,
          email,
          phoneNumber,
          marketingStrategy,
          firebaseID,
        },
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
    })
  }

  const onSubmit = async (data: IFormData) => {
    const { email, password, lastName } = data

    try {
      setLoading(true)
      await signUpViaFirebase(email, password)
        .then(async ({ user }) => {
          await sendEmailVerification(user)

          await updateProfile(user, { displayName: lastName }).catch((err) =>
            console.log(err),
          )

          // make api call to register new user in fauna db
          createBusiness(data, user.uid).then(() => {
            setLoading(false)
            router.push('/dashboard')
          })
        })
        .catch((error) => {
          setLoading(false)
          setFirebaseError(error.code.split('/')[1].split('-').join(' '))
        })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Layout>
      <Wrapper>
        <Form onSubmit={handleSubmit(onSubmit, handleError)}>
          <H4>List your business</H4>
          <H3>Grow your beauty or barber business risk free</H3>
          <TextInput
            label="First name"
            {...register('firstName')}
            placeholder="Enter your first name"
            classNames={classes}
          />
          {errors?.firstName && (
            <ErrorMessage>{errors.firstName.message}</ErrorMessage>
          )}
          <TextInput
            label="Last name"
            {...register('lastName')}
            placeholder="Enter your last name"
            classNames={classes}
          />
          {errors?.lastName && (
            <ErrorMessage>{errors.lastName.message}</ErrorMessage>
          )}
          <TextInput
            label="Email"
            {...register('email')}
            type="email"
            placeholder="Enter your email"
            classNames={classes}
          />
          {errors?.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
          <PasswordField
            currentValue={password}
            register={register}
            label="Password"
            placeholder="Enter your password"
            required
            name="password"
          />
          {errors?.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
          <PasswordField
            currentValue={confirmPassword}
            register={register}
            label="Confirm Password"
            placeholder="Confirm Password"
            required
            name="confirmPwd"
          />
          {errors?.confirmPwd && (
            <ErrorMessage>{errors.confirmPwd.message}</ErrorMessage>
          )}
          <TextInput
            {...register('phoneNumber')}
            label="Phone number"
            type="tel"
            placeholder="Enter your phone number"
            classNames={classes}
          />
          {errors?.phoneNumber && (
            <ErrorMessage>{errors.phoneNumber.message}</ErrorMessage>
          )}
          <Select
            style={{ marginTop: 20, zIndex: 2 }}
            data={sources}
            value={marketingStrategy}
            onChange={setMarketingStrategy}
            placeholder="Pick one"
            label="Where did you hear about us?"
            classNames={classes}
            required
          />
          <Submit>
            <PrimaryButton type="submit">
              {loading ? <Loading /> : 'Sign Up'}
            </PrimaryButton>
          </Submit>
        </Form>
      </Wrapper>
    </Layout>
  )
}

export default ProSignup
