import React, { Suspense, useRef } from 'react'
import { createStyles, Tabs } from '@mantine/core'

import Wrapper from 'src/components/Wrapper'
import Loading from '../Loading'
import useIntersectionObserver from 'src/hooks/useIntersectionObserver'
import EditPersonalInfo from '../EditPersonalInfo/EditPersonalInfo'
import ServiceMenu from '../ServiceMenu/ServiceMenu'
import PhotoGallery from '../PhotoGallery/PhotoGallery'
import PreviewProfile from '../PreviewProfile/PreviewProfile'
const EditBusinessInfo = React.lazy(() => import('../EditBusinessInfo'))

const useStyles = createStyles((theme) => ({
  root: {
    marginTop: '0.2rem',
  },
}))

const BusinessProfile = () => {
  const editBusinessTab = useRef(null)
  const serviceMenuTab = useRef(null)
  const editPersonalInfoTab = useRef(null)
  const photoGalleryTab = useRef(null)
  const previewProfileTab = useRef(null)
  const isBusinessInfoVisible = useIntersectionObserver(editBusinessTab)
  const isPersonalInfoVisible = useIntersectionObserver(editPersonalInfoTab)
  const isServiceMenuVisible = useIntersectionObserver(serviceMenuTab)
  const isPhotoGalleryVisible = useIntersectionObserver(photoGalleryTab)
  const isPreviewProfileMenuVisible = useIntersectionObserver(previewProfileTab)

  const { classes } = useStyles()

  return (
    <Wrapper>
      <Tabs classNames={classes} radius="xs" defaultValue="personal_info">
        <Tabs.List grow position="center">
          <Tabs.Tab value="preview">Preview</Tabs.Tab>
          <Tabs.Tab value="personal_info">Personal Info</Tabs.Tab>
          <Tabs.Tab value="business_info">Business Info</Tabs.Tab>
          <Tabs.Tab value="service_menu">Service Menu</Tabs.Tab>
          <Tabs.Tab value="photos">Photos</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="preview" pt="xs" ref={previewProfileTab}>
          {isPreviewProfileMenuVisible && (
            <Suspense fallback={<Loading />}>
              <PreviewProfile />
            </Suspense>
          )}
        </Tabs.Panel>
        <Tabs.Panel value="service_menu" pt="xs" ref={serviceMenuTab}>
          {isServiceMenuVisible && (
            <Suspense fallback={<Loading />}>
              <ServiceMenu />
            </Suspense>
          )}
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
        <Tabs.Panel value="photos" pt="xs" ref={photoGalleryTab}>
          {isPhotoGalleryVisible && (
            <Suspense fallback={<Loading />}>
              <PhotoGallery />
            </Suspense>
          )}
        </Tabs.Panel>
      </Tabs>
    </Wrapper>
  )
}

export default BusinessProfile
