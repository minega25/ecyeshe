//@ts-nocheck
import { useState } from 'react'
import styled from 'styled-components'
import Layout from 'src/components/Layout'
import { IconHourglassLow, IconStar } from '@tabler/icons'
import { Anchor, Space, Stack, Tabs, Text, Group } from '@mantine/core'
import { Calendar } from 'primereact/calendar'
import { toast } from 'react-toastify'

import Wrapper from 'src/components/Wrapper/Wrapper'
import UserInfo from 'src/components/UserInfo/UserInfo'
import { Button2, PrimaryButton } from 'src/components/Button'
import Modal from 'src/components/Modal/Modal'

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

const H1 = styled.h1`
  font-size: 1rem;
  text-align: center;
  margin: 1rem 0;
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

const Time = styled.div`
  margin: 1rem 0;
`

const Assurance = styled.div`
  padding: 0.2rem 1rem;
  background: var(--color-gray-100);
  margin: 1rem 0;
`

const Center = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
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
  setshowModal: (arg: any) => void
}

const Service = ({
  price,
  name,
  duration,
  description,
  setshowModal,
}: ServiceCardProps) => {
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
        <PrimaryButton onClick={() => setshowModal((prev: any) => !prev)}>
          See times
        </PrimaryButton>
      </div>
    </ServiceCard>
  )
}

interface ISeeTimesProps {
  showModal: boolean
  setshowModal: (arg: boolean) => void
}

const SeeTimes = ({ showModal, setshowModal }: ISeeTimesProps) => {
  const notify = () => {
    toast.success('Booking successful!')
    setshowModal(false)
  }
  let today = new Date()
  let month = today.getMonth()
  let year = today.getFullYear()
  let prevMonth = month === 0 ? 11 : month - 1
  let prevYear = prevMonth === 11 ? year - 1 : year
  let nextMonth = month === 11 ? 0 : month + 1
  let nextYear = nextMonth === 0 ? year + 1 : year
  let minDate = new Date()
  minDate.setMonth(prevMonth)
  minDate.setFullYear(prevYear)
  let maxDate = new Date()
  maxDate.setMonth(nextMonth)
  maxDate.setFullYear(nextYear)
  const [date, setDate] = useState(null)
  const [time, setTime] = useState()
  return (
    <Modal isOpen={showModal} setIsOpen={setshowModal} width="600px">
      <H1>Book appointment</H1>
      <Calendar
        value={date}
        onChange={(e) => setDate(e.value)}
        inline
        showWeek
        style={{ width: '600px' }}
        minDate={minDate}
        maxDate={maxDate}
      />
      {date && (
        <div>
          <Time>
            <Calendar
              value={time}
              onChange={(e) => setTime(e.value)}
              timeOnly
              placeholder="Select available time"
            />
          </Time>
          <Assurance>
            <h5>Reserve with Confidence</h5>
            <Space h="sm" />
            <p>
              You will not be charged if you cancel at least 24 hours before
              your appointment starts. Otherwise, you will be charged 50% of
              service price for late cancellations and 100% for no shows.
              StyleSeat is the safest way to pay to avoid scams. We are unable
              to provide payment protection if you pay your pro via Cash app,
              Venmo, cash, etc.
            </p>
          </Assurance>
          <Center>
            <Space h="sm" />
            <p>I agree to the terms of service and cancellation policy.</p>
            <Space h="sm" />
            <Button2 onClick={notify}>Book now</Button2>
          </Center>
        </div>
      )}
    </Modal>
  )
}

function BusinessProfile() {
  const [showModal, setshowModal] = useState<boolean>(false)

  return (
    <Layout>
      <Wrapper>
        <Section>
          <UserInfo {...user} />

          <LimitedAvailability>
            <IconHourglassLow color="hsl(322deg, 100%, 54%)" />
            <p>
              Minega&apos;s calendar is filling up for March - secure your spot
              now.
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
                setshowModal={setshowModal}
              />

              <Service
                name="Locs"
                price="1000"
                duration="15 minutes"
                description="asdfasdfasdfasdfa"
                setshowModal={setshowModal}
              />

              <Service
                name="Crochet Braids"
                price="1000"
                duration="15 minutes"
                description="asdfasdfasdfasdfa"
                setshowModal={setshowModal}
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
                <h3>Hi there, I&apos;m minega</h3>
                <p>Joined in 2022</p>
              </About>
            </Tabs.Panel>
          </Tabs>
        </Section>
      </Wrapper>
      <SeeTimes showModal={showModal} setshowModal={setshowModal} />
    </Layout>
  )
}

export default BusinessProfile
