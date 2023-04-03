import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'
import { Group, Avatar, Text, Button } from '@mantine/core'
import { IconStar } from '@tabler/icons'
import { Router, useRouter } from 'next/router'

const BusinessCardTemplate = styled.div`
  display: flex;
  margin: 1rem 1rem;
  box-shadow: 0.5px 1px 1px hsl(0deg 0% 50% / 0.7);
  padding: 0.5rem 1rem;
  border-radius: 0.2rem;
  will-change: transform;
  transition: box-shadow 750ms ease;

  &:hover {
    box-shadow: 1px 2px 2px hsl(0deg 0% 50% / 0.333),
      2px 4px 4px hsl(0deg 0% 50% / 0.333), 3px 6px 6px hsl(0deg 0% 50% / 0.333);
  }
`
const SamplePhotos = styled.div`
  max-width: 200px;
  display: flex;
  flex-wrap: wrap;

  & > * {
    margin: 1rem;
  }
`

const BusinessInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
`

interface Service {
  name: string
  duration: string
  price: string
}

interface IProps {
  images: string[]
  avatar: string
  name: string
  businessName: string
  rating: string
  topServices: Service[]
}

function BusinessCard({
  images,
  avatar,
  name,
  rating,
  businessName,
  topServices,
}: IProps) {
  const router = useRouter()
  return (
    <BusinessCardTemplate>
      <SamplePhotos>
        {images.map((image) => (
          <Image
            key={image}
            src={image}
            width="80"
            height="80"
            alt="sample work"
            style={{ margin: '1rem' }}
          />
        ))}
      </SamplePhotos>
      <BusinessInfo>
        <Group spacing="sm">
          <Avatar size={40} src={avatar} radius={40} />
          <div>
            <Text fz="sm" fw={500}>
              {name}
            </Text>
            <Text c="dimmed" fz="xs">
              {businessName}
            </Text>
            <Group spacing={10} mt={5} color="dimmed">
              <IconStar
                fill="hsl(322deg, 100%, 54%)"
                size={13}
                color="hsl(322deg, 100%, 54%)"
              />
              <IconStar
                fill="hsl(322deg, 100%, 54%)"
                size={13}
                color="hsl(322deg, 100%, 54%)"
              />
              <IconStar
                fill="hsl(322deg, 100%, 54%)"
                size={13}
                color="hsl(322deg, 100%, 54%)"
              />
              <IconStar
                fill="hsl(322deg, 100%, 54%)"
                size={13}
                color="hsl(322deg, 100%, 54%)"
              />
              <IconStar size={13} color="hsl(322deg, 100%, 54%)" />
            </Group>
          </div>
        </Group>
        <div>
          <Button
            variant="filled"
            radius="xl"
            onClick={() => {
              router.push('/business-profile')
            }}
          >
            All Services
          </Button>
          {topServices.map(({ name, duration, price }) => (
            <Button
              style={{ margin: '0.2rem' }}
              key={name}
              variant="outline"
              radius="xl"
              onClick={() => {
                router.push('/business-profile')
              }}
            >
              {name} - {duration} - {price}
            </Button>
          ))}
        </div>
      </BusinessInfo>
    </BusinessCardTemplate>
  )
}

export default BusinessCard
