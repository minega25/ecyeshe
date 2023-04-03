import React, { useState, useEffect } from 'react'
import { LoadingOverlay } from '@mantine/core'

import Wrapper from '../Wrapper/Wrapper'
import DropzoneButton from '../Dropzone'
import styled from 'styled-components'
import GalleryWithLightBox from '../GalleryWithLightBox/GalleryWithLightBox'
import { firebaseAuth } from 'src/auth/initFirebase'

const Section = styled.section`
  width: min(65ch, 100%);
  margin: 0 auto;
`

function PhotoGallery() {
  const [photos, setPhotos] = useState([])
  const [id, setId] = useState('')
  const [loading, setLoading] = useState<boolean>(false)
  console.log('loading :>> ', loading)

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
            const { _id, photos: allPhotos } = business[0]
            setId(_id)
            if (photos) {
              setPhotos(JSON.parse(allPhotos))
            }
          }
          setLoading(false)
        })
        .catch((e) => console.log(e))
    }
  }, [])

  return (
    <Wrapper>
      <LoadingOverlay visible={loading} overlayBlur={2} />
      <Section>
        <DropzoneButton
          photos={photos}
          setPhotos={setPhotos}
          setLoading={setLoading}
          id={id}
        />
        <GalleryWithLightBox photos={photos} />
      </Section>
    </Wrapper>
  )
}

export default PhotoGallery
