import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { signInWithEmailAndPassword } from 'firebase/auth'
import styled from 'styled-components'

import { PrimaryButton } from '../Button'
import { StyledInput as Input } from '../Input'
import { firebaseAuth } from 'src/auth/initFirebase'
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from 'react-social-login-buttons'
import Modal from '../Modal'
import { loginWithFacebook, loginWithGoogle } from 'src/auth/authWithProviders'
import { useRouter } from 'next/router'

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
`

const SocialAuth = styled.div`
  display: flex;
  flex-direction: column;
  & > * {
    font-family: var(--font-contents);
  }
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
  const { register, handleSubmit, setValue } = useForm<IFormData>()

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
      await logIn(email, password)
      router.push('/dashboard')
    } catch (error) {
      console.log(error)
    }
  }

  const handleGoogleAuth = () => {
    loginWithGoogle()
  }

  const handleFacebookAuth = () => {
    loginWithFacebook()
  }

  return (
    <Modal isOpen={showLoginModal} setIsOpen={setShowLoginModal}>
      <Container>
        <Separator>Sign in with</Separator>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="email"
            {...register('email')}
            required
            placeholder="Enter Email"
          />
          <Input
            type="password"
            {...register('password')}
            required
            placeholder="Password"
          />
          <PrimaryButton>Login</PrimaryButton>
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
