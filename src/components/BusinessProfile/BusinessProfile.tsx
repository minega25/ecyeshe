import React, { Suspense, useRef } from 'react'
import { createStyles, Tabs } from '@mantine/core'

import Wrapper from 'src/components/Wrapper'
import Loading from '../Loading'
import useIntersectionObserver from 'src/hooks/useIntersectionObserver'
import EditPersonalInfo from '../EditPersonalInfo/EditPersonalInfo'
const EditBusinessInfo = React.lazy(() => import('../EditBusinessInfo'))

const useStyles = createStyles((theme) => ({
  root: {
    marginTop: '0.2rem',
  },
}))

const BusinessProfile = () => {
  const editBusinessTab = useRef(null)
  const editPersonalInfoTab = useRef(null)
  const isBusinessInfoVisible = useIntersectionObserver(editBusinessTab)
  const isPersonalInfoVisible = useIntersectionObserver(editPersonalInfoTab)
  const { classes } = useStyles()

  return (
    <Wrapper>
      <Tabs classNames={classes} radius="xs" defaultValue="edit">
        <Tabs.List grow position="center">
          <Tabs.Tab value="edit">Edit</Tabs.Tab>
          <Tabs.Tab value="preview">Preview</Tabs.Tab>
          <Tabs.Tab value="personal_info">Personal Info</Tabs.Tab>
          <Tabs.Tab value="business_info">Business Info</Tabs.Tab>
          <Tabs.Tab value="service_menu">Service Menu</Tabs.Tab>
          <Tabs.Tab value="manage_availability">Manage Availability</Tabs.Tab>
          <Tabs.Tab value="photos">Photos</Tabs.Tab>
          <Tabs.Tab value="ratings">Star Ratings & Reviews</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="edit" pt="xs">
          edit tab content
        </Tabs.Panel>
        <Tabs.Panel value="preview" pt="xs">
          preview tab content
        </Tabs.Panel>
        <Tabs.Panel value="service_menu" pt="xs">
          service_menu tab content
        </Tabs.Panel>
        <Tabs.Panel value="personal_info" pt="xs" ref={editPersonalInfoTab}>
          {isPersonalInfoVisible && (
            <Suspense fallback={<Loading />}>
              <EditPersonalInfo />
            </Suspense>
          )}
        </Tabs.Panel>
        <Tabs.Panel value="business_info" pt="xs" ref={editBusinessTab}>
          {isBusinessInfoVisible && (
            <Suspense fallback={<Loading />}>
              <EditBusinessInfo />
            </Suspense>
          )}
        </Tabs.Panel>
        <Tabs.Panel value="manage_availability" pt="xs">
          manage_availability tab content
        </Tabs.Panel>
        <Tabs.Panel value="photos" pt="xs">
          Photos tab content
        </Tabs.Panel>
        <Tabs.Panel value="ratings" pt="xs">
          ratings tab content
        </Tabs.Panel>
      </Tabs>
    </Wrapper>
  )
}

export default BusinessProfile
