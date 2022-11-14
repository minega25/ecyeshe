import { useEffect, useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import { PrimaryButton } from '../Button'
import { StyledInput as Input } from '../Input'
import { firebaseAuth } from 'src/auth/initFirebase'
import { loginWithFacebook, loginWithGoogle } from 'src/auth/authWithProviders'
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from 'react-social-login-buttons'
import Modal from '../Modal'

const Form = styled.form`
  margin: 2rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Separator = styled.span`
  font-size: medium;
  text-align: center;
  font-weight: 700;
  font-family: var(--font-contents);
`

const SocialAuth = styled.div`
  display: flex;
  flex-direction: column;
  & > * {
    font-family: var(--font-contents);
  }
`

const ErrorMessage = styled.span`
  color: var(--color-error);
  background: var(--color-error-background);
  width: 100%;
  padding: 0 1rem;
  margin: 0.5rem 0rem;
`

interface IProps {
  showSignupModal: boolean | undefined
  setShowSignupModal: () => void
}

interface IFormData {
  email: string
  password: string
  confirmPwd: string
}

function SignupBusiness({
  showSignupModal = false,
  setShowSignupModal,
}: IProps) {
  const [firebaseError, setFirebaseError] = useState()
  const router = useRouter()
  const formSchema = Yup.object().shape({
    email: Yup.string().email().required('Email is mandatory'),
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
  } = useForm<IFormData>({ resolver: yupResolver(formSchema), mode: 'onBlur' })

  useEffect(() => {
    register('email')
    register('password')
    register('confirmPwd')
  }, [register])

  const signUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password)
  }

  const handleError = (errors: any) => {
    console.error('errors :>> ', errors)
  }

  const onSubmit = async (data: IFormData) => {
    const { email, password } = data
    try {
      await signUp(email, password)
        .then((data) => {
          console.log('data :>> ', data)
          // router.push('/dashboard')
        })
        .catch((error) => {
          setFirebaseError(error.code.split('/')[1].split('-').join(' '))
        })
    } catch (error) {
      console.log(error)
    }
  }

  const handleGoogleAuth = () => {
    try {
      loginWithGoogle()
        .then(() => {
          router.push('/dashboard')
        })
        .catch((error) => {
          setFirebaseError(error.code.split('/')[1].split('-').join(' '))
        })
    } catch (error) {
      console.error(error)
    }
  }

  const handleFacebookAuth = () => {
    try {
      loginWithFacebook()
        .then(() => {
          router.push('/dashboard')
        })
        .catch((error) => {
          setFirebaseError(error.code.split('/')[1].split('-').join(' '))
        })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Modal isOpen={showSignupModal} setIsOpen={setShowSignupModal}>
      <Container>
        <Separator>Sign up with</Separator>
        <Form onSubmit={handleSubmit(onSubmit, handleError)}>
          <Input
            type="email"
            {...register('email')}
            required
            placeholder="Enter Email"
          />
          {errors?.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
          <Input
            type="password"
            {...register('password')}
            required
            placeholder="Password"
          />
          {errors?.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
          <Input
            type="password"
            {...register('confirmPwd')}
            required
            placeholder="Confirm password"
          />
          {errors?.confirmPwd && (
            <ErrorMessage>{errors.confirmPwd.message}</ErrorMessage>
          )}
          <PrimaryButton>Create account</PrimaryButton>
          {firebaseError && <ErrorMessage>{firebaseError}</ErrorMessage>}
        </Form>
        <Separator>Or</Separator>
        <SocialAuth>
          <GoogleLoginButton
            text="Signup with Google"
            onClick={handleGoogleAuth}
          />
          <FacebookLoginButton
            text="Signup with Facebook"
            onClick={handleFacebookAuth}
          />
        </SocialAuth>
      </Container>
    </Modal>
  )
}

export default SignupBusiness
