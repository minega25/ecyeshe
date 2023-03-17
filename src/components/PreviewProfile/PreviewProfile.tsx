import React from 'react'
import styled from 'styled-components'
import { IconHourglassLow, IconStar } from '@tabler/icons'
import { Anchor, Space, Stack, Tabs, Text } from '@mantine/core'

import Wrapper from '../Wrapper/Wrapper'
import UserInfo from '../UserInfo/UserInfo'
import { PrimaryButton } from '../Button'

const Section = styled.section`
  width: min(65ch, 100%);
  margin: 1rem auto;
`

const LimitedAvailability = styled.div`
  width: 100%;
  border: 1px solid #d3d3d3;
  border-radius: 2px;
  display: flex;
  padding: 1rem;
  margin: 1rem;

  & > p {
    margin-left: 1rem;
  }
`

const About = styled.div``

const ServiceCard = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border: 1px solid #d3d3d3;
  margin: 0.5rem 0;
`

const Panel = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
`

const H3 = styled.div`
  display: flex;

  &: > * {
    padding: 0 0.2rem;
  }
`

const ReviewCard = styled.div`
  display: flex;
  min-width: 300px;
  align-items: center;
  margin: 0.2rem 0;
`

const Bar = styled.span`
  width: 100%;
  border: 2px solid hsl(322deg, 100%, 54%);
  height: 0;
  margin: 0 0.5rem;
`

const user = {
  avatar: '',
  // avatar:
  // 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80',
  title: 'Professional',
  name: 'Patrick Minega',
  businessName: 'Calvin Shop',
}

interface Review {
  rate: string
  percentage: string
}

const Review = ({ rate, percentage }: Review) => {
  return (
    <ReviewCard>
      <p>{rate} </p>
      <IconStar color="hsl(322deg, 100%, 54%)" /> <Bar />
      <span>{percentage}%</span>
    </ReviewCard>
  )
}

interface ServiceCardProps {
  price?: string
  name: string
  duration?: string
  description?: string
}

const Service = ({ price, name, duration, description }: ServiceCardProps) => {
  return (
    <ServiceCard>
      <div>
        <Text fw={500}>{name}</Text>
        <Text color="dimmed" size="sm">
          RWF {price} for {duration}
        </Text>
        <Space h="sm" />
        <Text color="dimmed" size="sm">
          {description}
        </Text>
        <Space h="sm" />
        <Text>
          <Anchor href="#">More info</Anchor>
        </Text>
      </div>
      <div onClick={() => console.log('logged')}>
        <PrimaryButton>Request</PrimaryButton>
      </div>
    </ServiceCard>
  )
}

function PreviewProfile() {
  return (
    <Wrapper>
      <Section>
        <UserInfo {...user} />

        <LimitedAvailability>
          <IconHourglassLow color="hsl(322deg, 100%, 54%)" />
          <p>
            Minega's calendar is filling up for March - secure your spot now.
          </p>
        </LimitedAvailability>

        <Tabs radius="xs" defaultValue="about">
          <Tabs.List>
            <Tabs.Tab value="services">Services</Tabs.Tab>
            <Tabs.Tab value="reviews">Reviews</Tabs.Tab>
            <Tabs.Tab value="about">About</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="services" pt="xs">
            <Service
              name="Bang Trim"
              price="1000"
              duration="15 minutes"
              description="asdfasdfasdfasdfa"
            />

            <Service
              name="Bang Trim"
              price="1000"
              duration="15 minutes"
              description="asdfasdfasdfasdfa"
            />
            <Service
              name="Bang Trim"
              price="1000"
              duration="15 minutes"
              description="asdfasdfasdfasdfa"
            />
            <Service
              name="Bang Trim"
              price="1000"
              duration="15 minutes"
              description="asdfasdfasdfasdfa"
            />
            <Service
              name="Bang Trim"
              price="1000"
              duration="15 minutes"
              description="asdfasdfasdfasdfa"
            />
          </Tabs.Panel>

          <Tabs.Panel value="reviews" pt="xs">
            <Panel>
              <H3>
                <IconStar /> <p>0.0 </p> <p>(0 Reviews)</p>
              </H3>
              <Stack justify="center" spacing="xs">
                <Review rate="0" percentage="0" />
                <Review rate="1" percentage="0" />
                <Review rate="2" percentage="0" />
                <Review rate="3" percentage="0" />
                <Review rate="4" percentage="0" />
                <Review rate="5" percentage="0" />
              </Stack>
            </Panel>
          </Tabs.Panel>

          <Tabs.Panel value="about" pt="xs">
            <About>
              <h3>Hi there, I'm minega</h3>
              <p>Joined in 2022</p>
            </About>
          </Tabs.Panel>
        </Tabs>
      </Section>
    </Wrapper>
  )
}

export default PreviewProfile
