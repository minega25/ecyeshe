import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import Image from 'next/image'
import Router, { useRouter } from 'next/router'

import { ButtonSearch } from 'src/components/Button'
import SearchLocationBox from 'src/components/Searchbox'
import ServiceSearch from 'src/components/ServiceSearch'

const Form = styled.form`
  margin: 2rem 0;
  display: flex;
  justify-content: space-between;
`

interface IFormData {
  address: string
  latitude: number
  longitude: number
  service: string
}

interface IProps {
  defaultValues?:
    | {
        address?: string | undefined
        latitude?: number | undefined
        longitude?: number | undefined
        service?: string | undefined
      }
    | undefined
}

function SearchForm({ defaultValues }: IProps) {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const { asPath } = useRouter()
  const { register, handleSubmit, setValue } = useForm<IFormData>({
    defaultValues,
  })

  useEffect(() => {
    register('address', { required: 'Please enter your address' })
    register('latitude', { required: true, min: -90, max: 90 })
    register('longitude', { required: true, min: -180, max: 180 })
    register('service', {
      required: 'Please enter service you are looking for...',
    })
  }, [register])

  useEffect(() => {
    const handleRouteChange = () => {
      if (asPath !== '/') Router.reload()
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [])

  const handleCreate = async (data: IFormData) => {
    Router.push({
      pathname: '/search',
      query: { ...data },
    })
  }

  const onSubmit = (data: IFormData) => {
    setSubmitting(false)
    handleCreate(data)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <ServiceSearch
        onSelectService={(service) => {
          setValue('service', service || '')
        }}
        defaultValue={defaultValues?.service || ''}
      />
      <SearchLocationBox
        onSelectAddress={(address, latitude, longitude) => {
          setValue('address', address || '')
          setValue('latitude', latitude || 0)
          setValue('longitude', longitude || 0)
        }}
        defaultValue={defaultValues?.address || ''}
      />
      <ButtonSearch>
        <Image src="/search.svg" height={30} width={30} alt="" />
      </ButtonSearch>
    </Form>
  )
}

export default SearchForm
