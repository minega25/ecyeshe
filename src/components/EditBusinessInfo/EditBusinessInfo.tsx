import React, { useState, useEffect } from 'react'
import { createStyles, TextInput, Switch } from '@mantine/core'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import { firebaseAuth } from 'src/auth/initFirebase'
import Wrapper from 'src/components/Wrapper'
import { PrimaryButton } from 'src/components/Button'
import Loading from 'src/components/Loading'

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
  name: string
  salonNumber: string
  phoneNumber: string
  smsPhoneNumber: string
  isMobileBusiness: boolean
  streetAddress: string
  city: string
}

const defaultValues: IFormData = {
  name: '',
  salonNumber: '',
  phoneNumber: '',
  smsPhoneNumber: '',
  isMobileBusiness: false,
  streetAddress: '',
  city: '',
}

const EditBusinessInfo = () => {
  const router = useRouter()
  const { classes } = useStyles()
  const [loading, setLoading] = useState(false)
  const [isMobileBusiness, setIsMobileBusiness] = useState<boolean>(false)

  const formSchema = Yup.object().shape({
    name: Yup.string().required('Email is mandatory'),
    salonNumber: Yup.string(),
    phoneNumber: Yup.string(),
    isMobileBusiness: Yup.boolean(),
    streetAddress: Yup.string(),
    city: Yup.string(),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    resolver: yupResolver(formSchema),
    mode: 'onBlur',
    defaultValues,
  })

  useEffect(() => {
    if (firebaseAuth.currentUser?.email) {
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
          console.log('data :>> ', data)
        })
        .catch((e) => console.log(e))
    }
  }, [])

  useEffect(() => {
    register('name')
    register('salonNumber')
    register('phoneNumber')
    register('smsPhoneNumber')
    register('isMobileBusiness')
    register('streetAddress')
    register('city')
  }, [register])

  const handleError = (errors: any) => {
    console.error('errors :>> ', errors)
  }

  const updateBusiness = (data: IFormData, firebaseID?: string) => {
    const {
      salonNumber,
      phoneNumber,
      smsPhoneNumber,
      isMobileBusiness,
      streetAddress,
      city,
    } = data
    return fetch('/api/update-business', {
      method: 'POST',
      body: JSON.stringify({
        data: {
          salonNumber,
          phoneNumber,
          smsPhoneNumber,
          isMobileBusiness,
          streetAddress,
          city,
        },
        id: firebaseID,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
    })
  }

  const onSubmit = async (data: IFormData) => {
    // const { email, password, lastName } = data
    // try {
    //   setLoading(true)
    //   updateBusiness(data, user.uid).then(() => {
    //     setLoading(false)
    //     router.push('/dashboard')
    //   })
    // } catch (error) {
    //   console.log(error)
    // }
  }

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(onSubmit, handleError)}>
        <H4>Update your business info</H4>
        <TextInput
          label="Business Name"
          {...register('name')}
          placeholder="e.g. Calvin's Saloon"
          classNames={classes}
        />
        {errors?.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        <TextInput
          label="Salon Number"
          {...register('salonNumber')}
          classNames={classes}
        />
        {errors?.salonNumber && (
          <ErrorMessage>{errors.salonNumber.message}</ErrorMessage>
        )}
        <TextInput
          label="Personal Phone Number"
          {...register('phoneNumber')}
          classNames={classes}
        />
        {errors?.phoneNumber && (
          <ErrorMessage>{errors.phoneNumber.message}</ErrorMessage>
        )}
        <TextInput
          label="SMS Notifications Phone Number"
          {...register('smsPhoneNumber')}
          classNames={classes}
        />
        {errors?.smsPhoneNumber && (
          <ErrorMessage>{errors.smsPhoneNumber.message}</ErrorMessage>
        )}

        <H4>Business Location</H4>
        <Switch
          labelPosition="left"
          checked={isMobileBusiness}
          onChange={(event) => setIsMobileBusiness(event.currentTarget.checked)}
          label="Mobile business"
          description="Turn on if you travel to meet your clients"
          size="md"
        />
        <TextInput
          label="Street Address"
          {...register('streetAddress')}
          classNames={classes}
        />
        {errors?.smsPhoneNumber && (
          <ErrorMessage>{errors.smsPhoneNumber.message}</ErrorMessage>
        )}
        <TextInput label="City" {...register('city')} classNames={classes} />
        {errors?.smsPhoneNumber && (
          <ErrorMessage>{errors.smsPhoneNumber.message}</ErrorMessage>
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
