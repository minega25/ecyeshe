import { useEffect } from 'react'
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

interface IProps {
  showSignupModal: boolean | undefined
  setShowSignupModal: () => void
}

interface IFormData {
  email: string
  password: string
  confirmPwd: string
}

function SignUp({ showSignupModal = false, setShowSignupModal }: IProps) {
  const router = useRouter()
  const formSchema = Yup.object().shape({
    email: Yup.string().email().required('Email is mandatory'),
    password: Yup.string()
      .required('Password is mendatory')
      .min(3, 'Password must be at 3 char long'),
    confirmPwd: Yup.string()
      .required('Password is mendatory')
      .oneOf([Yup.ref('password')], 'Passwords does not match'),
  })
  const formOptions = { resolver: yupResolver(formSchema) }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>(formOptions)

  useEffect(() => {
    register('email')
    register('password')
    register('confirmPwd')
  }, [register])

  const signUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password)
  }

  const onSubmit = async (data: IFormData) => {
    const { email, password } = data
    try {
      await signUp(email, password)
      router.push('/dashboard')
    } catch (error) {
      console.log(error)
    }
  }

  const handleGoogleAuth = () => {
    try {
      loginWithGoogle()
    } catch (error) {
      console.error(error)
    }
  }

  const handleFacebookAuth = () => {
    try {
      loginWithFacebook()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Modal isOpen={showSignupModal} setIsOpen={setShowSignupModal}>
      <Container>
        <Separator>Sign up with</Separator>
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
          <Input
            type="password"
            {...register('confirmPwd')}
            required
            placeholder="Confirm password"
          />
          <PrimaryButton>Create account</PrimaryButton>
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

export default SignUp
