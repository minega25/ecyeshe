import styled from 'styled-components'
import {
  TextInput,
  createStyles,
  Select,
  Textarea,
  LoadingOverlay,
} from '@mantine/core'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { useEffect, useState } from 'react'

import Modal from '../Modal/Modal'
import { durations } from 'src/data/durations'
import { PrimaryButton } from '../Button'
import Loading from '../Loading/Loading'
import { firebaseAuth } from 'src/auth/initFirebase'

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

const Separator = styled.span`
  font-size: medium;
  text-align: center;
  font-weight: 700;
  font-family: var(--font-contents);
  margin: 1rem;
  width: 100%;
  display: block;
  padding: 1rem;
`

const Section = styled.section`
  margin: 2rem 0;
`
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

interface IAddServiceDetailsProps {
  showModal: boolean
  setshowModal: (arg: boolean) => void
  name: string
}

interface IFormData {
  name: string
  price: string
  duration: string
  description: string
}

const AddServiceDetails = ({
  showModal,
  setshowModal,
  name,
}: IAddServiceDetailsProps) => {
  const [id, setId] = useState()
  const [loading, setLoading] = useState<boolean>(false)
  const [currentServiceDetails, setCurrentServiceDetails] = useState([])

  const [duration, setDuration] = useState<string | null>(null)
  const { classes } = useStyles()

  const formSchema = Yup.object().shape({
    name: Yup.string().required('Service name is mandatory'),
    price: Yup.string().required('Price is mandatory'),
    description: Yup.string().nullable(),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IFormData>({
    resolver: yupResolver(formSchema),
    mode: 'onBlur',
    defaultValues: {
      name,
      price: '',
      description: '',
    },
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
            const { serviceDetails, _id } = business[0]

            let found = null

            if (serviceDetails) {
              const serviceDetailsArr = JSON.parse(serviceDetails)
              setCurrentServiceDetails(serviceDetailsArr)

              found = serviceDetailsArr.find(
                (s: { name: string }) => s.name === name,
              )
            }

            if (found) {
              setValue('name', found.name)
              setValue('price', found.price)
              setDuration(found.duration)
              setValue('description', found.description)
            }

            setId(_id)

            setLoading(false)
          }
        })
        .catch((e) => console.log(e))
    }
  }, [name])

  useEffect(() => {
    register('name')
    register('price')
    register('description')
  }, [register])

  const handleError = (errors: any) => {
    console.error('errors :>> ', errors)
  }

  const updateBusiness = (data: IFormData, id?: string) => {
    const { name, description, price } = data

    return fetch('/api/update-business', {
      method: 'POST',
      body: JSON.stringify({
        data: {
          serviceDetails: JSON.stringify([
            { name, description, price, duration },
            ...currentServiceDetails,
          ]),
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
    setLoading(true)
    try {
      updateBusiness(data, id).then(() => {
        setLoading(false)
        setshowModal(false)
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Modal isOpen={showModal} setIsOpen={setshowModal}>
      <LoadingOverlay visible={loading} overlayBlur={2} />
      <Separator>Add service details</Separator>

      <Section>
        <Form onSubmit={handleSubmit(onSubmit, handleError)}>
          <H4>Fill below details</H4>
          <TextInput
            label="Service name"
            {...register('name')}
            placeholder="Enter service name"
            classNames={classes}
            required
          />
          {errors?.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
          <TextInput
            label="Price"
            {...register('price')}
            placeholder="Enter service price"
            classNames={classes}
            required
          />
          {errors?.price && <ErrorMessage>{errors.price.message}</ErrorMessage>}
          <Select
            label="Duration"
            value={duration}
            onChange={setDuration}
            placeholder="Pick one"
            data={durations}
            required
          />
          <Textarea
            placeholder="Let clients know how to prepare, what to bring, and what this service entails."
            label="Description"
            {...register('description')}
          />
          {errors?.description && (
            <ErrorMessage>{errors.description.message}</ErrorMessage>
          )}

          <Submit>
            <PrimaryButton type="submit">
              {loading ? <Loading /> : 'Save'}
            </PrimaryButton>
          </Submit>
        </Form>
      </Section>
    </Modal>
  )
}

export default AddServiceDetails
