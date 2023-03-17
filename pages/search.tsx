import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'

import Layout from 'src/components/Layout'
import SearchForm from 'src/components/SearchForm'
import SingleMap from 'src/components/Map'
import BusinessCard from 'src/components/BusinessCard'
import { nearbyBusinesses } from 'src/data/businesses'

const Section = styled.section`
  display: flex;
  justify-content: space-between;
`
const BusinessCards = styled.div`
  display: flex;
  flex-direction: column;
`

interface IQueryData {
  latitude?: string | string[]
  longitude?: string | string[]
  service?: string | string[]
  address?: string | string[]
}

const Search = () => {
  const router = useRouter()
  const [isHydrationDone, setIsHydrationDone] = useState<boolean>(
    router.isReady,
  )
  const [data, setData] = useState<IQueryData>({})

  useEffect(() => {
    if (router.isReady) {
      setIsHydrationDone(true)
      const { latitude, longitude, service, address } = router.query
      setData({ latitude, longitude, service, address })
    }
  }, [router.isReady, router.query])

  return (
    <Layout>
      <Section>
        <div>
          {isHydrationDone && (
            <SearchForm
              defaultValues={{
                latitude: Number(data?.latitude),
                longitude: Number(data?.longitude),
                address: data?.address?.toString(),
                service: data?.service?.toString(),
              }}
            />
          )}
          <BusinessCards>
            {nearbyBusinesses.map((business) => (
              <BusinessCard key={business.id} {...business} />
            ))}
          </BusinessCards>
        </div>
        <div>
          {isHydrationDone && JSON.stringify(data) !== '{}' && (
            <SingleMap
              chosenLocation={{
                latitude: Number(data?.latitude),
                longitude: Number(data?.longitude),
              }}
              nearbyBusinesses={nearbyBusinesses}
            />
          )}
        </div>
      </Section>
    </Layout>
  )
}

export default Search
