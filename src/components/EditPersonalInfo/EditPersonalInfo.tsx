import React, { useState, useEffect } from 'react'
import {
  createStyles,
  TextInput,
  MultiSelect,
  LoadingOverlay,
  Select,
  Textarea,
} from '@mantine/core'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import { firebaseAuth } from 'src/auth/initFirebase'
import Wrapper from 'src/components/Wrapper'
import { PrimaryButton } from 'src/components/Button'
import Loading from 'src/components/Loading'
import { useAuth } from 'src/auth/useAuth'
import specialities from 'src/data/specialities'
import professions from 'src/data/professions'

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
  firstName: string
  lastName: string
  phoneNumber: string
  email: string
  profession: string
  speciality: string
  aboutMe: string
}

const defaultValues: IFormData = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  email: '',
  profession: '',
  speciality: '',
  aboutMe: '',
}

const EditBusinessInfo = () => {
  const router = useRouter()
  const { classes } = useStyles()
  const [loading, setLoading] = useState(false)
  const [profession, setProfession] = useState<string | null>(null)
  const [specialties, setSpecialties] = useState([])
  const [id, setId] = useState()

  const formSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is mandatory'),
    lastName: Yup.string().required('First name is mandatory'),
    email: Yup.string().required('Email is mandatory'),
    phoneNumber: Yup.string().nullable(),
    profession: Yup.string().nullable(),
    speciality: Yup.string().nullable(),
    aboutMe: Yup.string().nullable(),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IFormData>({
    resolver: yupResolver(formSchema),
    mode: 'onBlur',
    defaultValues,
  })

  useEffect(() => {
    if (firebaseAuth.currentUser?.email) {
      setLoading(true)
      fetch('/api/get-single-business', {
        method: 'POST',
        body: JSON.stringify({
          email: firebaseAuth.currentUser?.email,
        }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json()
          }
        })
        .then((data) => {
          const business = data?.allBusinessesByEmail?.data || null
          if (business) {
            const {
              email,
              aboutMe,
              firstName,
              lastName,
              profession,
              speciality,
              phoneNumber,
              _id,
            } = business[0]

            setId(_id)

            setValue('email', email)
            setValue('aboutMe', aboutMe)
            setValue('firstName', firstName)
            setValue('phoneNumber', phoneNumber)
            setSpecialties(speciality?.split(',')?.slice(0) || '')
            setProfession(profession)
            setValue('lastName', lastName)

            setLoading(false)
          }
        })
        .catch((e) => console.log(e))
    }
  }, [])

  useEffect(() => {
    register('aboutMe')
    register('email')
    register('firstName')
    register('lastName')
    register('phoneNumber')
    register('profession')
    register('speciality')
  }, [register])

  const handleError = (errors: any) => {
    console.error('errors :>> ', errors)
  }

  const updateBusiness = (data: IFormData, id?: string) => {
    const { email, aboutMe, firstName, lastName, phoneNumber } = data
    return fetch('/api/update-business', {
      method: 'POST',
      body: JSON.stringify({
        data: {
          email,
          aboutMe,
          firstName,
          lastName,
          profession,
          speciality:
            specialties.length > 0
              ? specialties.reduce((acc, val) => acc + ',' + val, '')
              : '',
          phoneNumber,
        },
        id,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
    })
  }

  const onSubmit = async (data: IFormData) => {
    try {
      setLoading(true)
      updateBusiness(data, id).then(() => {
        setLoading(false)
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Wrapper>
      <LoadingOverlay visible={loading} overlayBlur={2} />
      <Form onSubmit={handleSubmit(onSubmit, handleError)}>
        <H4>Update your personal info</H4>
        <TextInput
          label="First name"
          {...register('firstName')}
          placeholder="Enter your first name"
          classNames={classes}
          required
        />
        {errors?.firstName && (
          <ErrorMessage>{errors.firstName.message}</ErrorMessage>
        )}
        <TextInput
          label="First name"
          {...register('lastName')}
          placeholder="Enter your last name"
          classNames={classes}
          required
        />
        {errors?.lastName && (
          <ErrorMessage>{errors.lastName.message}</ErrorMessage>
        )}
        <TextInput
          label="Email"
          {...register('email')}
          classNames={classes}
          placeholder="Enter your email"
          required
        />
        {errors?.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        <Select
          label="My Profession"
          data={professions}
          placeholder="Pick one"
          classNames={classes}
          value={profession}
          defaultValue="Other Professional"
          onChange={setProfession}
        />
        <MultiSelect
          data={specialities}
          label="My Specialty"
          maxSelectedValues={2}
          classNames={classes}
          value={specialties}
          placeholder="Select 2 specialties"
          /* @ts-ignore */
          onChange={setSpecialties}
        />
        <Textarea
          placeholder="About Me"
          label="About Me"
          {...register('aboutMe')}
          classNames={classes}
        />
        <TextInput
          label="Phone Number"
          {...register('phoneNumber')}
          classNames={classes}
          placeholder="Enter your personal phone number"
        />
        {errors?.phoneNumber && (
          <ErrorMessage>{errors.phoneNumber.message}</ErrorMessage>
        )}

        <Submit>
          <PrimaryButton type="submit">
            {loading ? <Loading /> : 'Update'}
          </PrimaryButton>
        </Submit>
      </Form>
    </Wrapper>
  )
}

export default React.memo(EditBusinessInfo)
