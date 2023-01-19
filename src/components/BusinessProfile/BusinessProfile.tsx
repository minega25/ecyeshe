import React from 'react'
import { createStyles, Tabs } from '@mantine/core'

import Wrapper from 'src/components/Wrapper'

const useStyles = createStyles((theme) => ({
  root: {
    marginTop: '0.5rem',
  },
}))

const BusinessProfile = () => {
  const { classes } = useStyles()

  return (
    <Wrapper>
      <Tabs classNames={classes} radius="xs" defaultValue="gallery">
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
        <Tabs.Panel value="personal_info" pt="xs">
          personal_info tab content
        </Tabs.Panel>
        <Tabs.Panel value="business_info" pt="xs">
          business_info tab content
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
