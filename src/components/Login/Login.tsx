import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { signInWithEmailAndPassword } from 'firebase/auth'
import styled from 'styled-components'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from 'react-social-login-buttons'
import { useRouter } from 'next/router'

import { PrimaryButton } from '../Button'
import { StyledInput as Input } from '../Input'
import { firebaseAuth } from 'src/auth/initFirebase'
import Modal from '../Modal'
import { loginWithFacebook, loginWithGoogle } from 'src/auth/authWithProviders'
import Loading from '../Loading'

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
  margin: 1rem;
  width: 100%;
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
  showLoginModal: boolean | undefined
  setShowLoginModal: () => void
}

interface IFormData {
  email: string
  password: string
}

function Login({ showLoginModal = false, setShowLoginModal }: IProps) {
  const router = useRouter()
  const [firebaseError, setFirebaseError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>()
  const formSchema = Yup.object().shape({
    email: Yup.string().email().required('Email is mandatory'),
    password: Yup.string()
      .required('Password is mandatory')
      .min(3, 'Password must be at 3 char long'),
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    resolver: yupResolver(formSchema),
    mode: 'onBlur',
  })

  useEffect(() => {
    register('email', { required: 'Enter Email' })
    register('password', { required: 'Password' })
  }, [register])

  const logIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password)
  }

  const onSubmit = async (data: IFormData) => {
    const { email, password } = data
    try {
      setFirebaseError('')
      setLoading(true)
      await logIn(email, password)
        .then(() => {
          setLoading(false)
          router.push('/dashboard')
        })
        .catch((error) => {
          setLoading(false)
          setFirebaseError(error.code.split('/')[1].split('-').join(' '))
        })
    } catch (error) {
      console.log(error)
    }
  }

  const handleError = (errors: any) => {
    console.error('errors :>> ', errors)
  }

  const handleGoogleAuth = () => {
    loginWithGoogle()
      .then(() => {
        router.push('/dashboard')
      })
      .catch((error) => {
        setFirebaseError(error.code.split('/')[1].split('-').join(' '))
      })
  }

  const handleFacebookAuth = () => {
    loginWithFacebook()
      .then(() => {
        router.push('/dashboard')
      })
      .catch((error) => {
        setFirebaseError(error.code.split('/')[1].split('-').join(' '))
      })
  }

  return (
    <Modal isOpen={showLoginModal} setIsOpen={setShowLoginModal}>
      <Container>
        <Separator>Sign in with</Separator>
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
          <PrimaryButton>{loading ? <Loading /> : 'Login'}</PrimaryButton>
          {firebaseError && (
            <ErrorMessage>wrong username or password</ErrorMessage>
          )}
        </Form>
        <Separator>Or</Separator>
        <SocialAuth>
          <GoogleLoginButton onClick={handleGoogleAuth} />
          <FacebookLoginButton onClick={handleFacebookAuth} />
        </SocialAuth>
      </Container>
    </Modal>
  )
}

export default Login
