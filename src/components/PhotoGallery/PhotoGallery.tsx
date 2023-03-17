import React, { useState, useEffect } from 'react'

import Wrapper from '../Wrapper/Wrapper'
import { DropzoneButton } from '../Dropzone'
import styled from 'styled-components'
import GalleryWithLightBox from '../GalleryWithLightBox/GalleryWithLightBox'
import { firebaseAuth } from 'src/auth/initFirebase'

const Section = styled.section`
  width: min(65ch, 100%);
  margin: 0 auto;
`

const dummy = [
  'https://source.unsplash.com/2ShvY8Lf6l0/800x599',

  'https://source.unsplash.com/Dm-qxdynoEc/800x799',

  'https://source.unsplash.com/qDkso9nvCg0/600x799',

  'https://source.unsplash.com/iecJiKe_RNg/600x799',

  'https://source.unsplash.com/epcsn8Ed8kY/600x799',

  'https://source.unsplash.com/NQSWvyVRIJk/800x599',

  'https://source.unsplash.com/zh7GEuORbUw/600x799',

  'https://source.unsplash.com/PpOHJezOalU/800x599',

  'https://source.unsplash.com/I1ASdgphUH4/800x599',
]

function PhotoGallery() {
  const [photos, setPhotos] = useState(dummy)
  const [id, setId] = useState('')
  const [loading, setLoading] = useState<boolean>(false)

  const updateBusiness = (photos: string, id?: string) => {
    setLoading(true)
    return fetch('/api/update-business', {
      method: 'POST',
      body: JSON.stringify({
        data: {
          photos,
        },
        id,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
    })
  }

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
            const { _id } = business[0]

            setId(_id)
            setLoading(false)
          }
        })
        .catch((e) => console.log(e))
    }
  }, [])

  useEffect(() => {
    updateBusiness(JSON.stringify(photos), id)
  }, [photos])

  return (
    <Wrapper>
      <Section>
        <DropzoneButton photos={photos} setPhotos={setPhotos} />
        <GalleryWithLightBox photos={photos} />
      </Section>
    </Wrapper>
  )
}

export default PhotoGallery
