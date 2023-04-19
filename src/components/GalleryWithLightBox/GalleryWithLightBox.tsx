//@ts-nocheck
import { useState, useCallback, useEffect } from 'react'
import Gallery from 'react-photo-gallery'
import Carousel, { Modal, ModalGateway } from 'react-images'

import Wrapper from '../Wrapper/Wrapper'

function GalleryWithLightBox({ photos = [] }) {
  const [allImages, setAllImages] = useState(
    photos?.map((photo) => ({ src: photo, width: 4, height: 3 })) || [],
  )

  const [currentImage, setCurrentImage] = useState(0)
  const [viewerIsOpen, setViewerIsOpen] = useState(false)

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index)
    setViewerIsOpen(true)
  }, [])

  const closeLightbox = () => {
    setCurrentImage(0)
    setViewerIsOpen(false)
  }

  useEffect(() => {
    setAllImages(
      photos?.map((photo) => ({ src: photo, width: 4, height: 3 })) || [],
    )
  }, [photos])

  return (
    <Wrapper>
      <Gallery photos={allImages} onClick={openLightbox} />
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={allImages.map((x) => ({
                ...x,
                srcset: x.srcSet,
                caption: x.title,
              }))}
              styles={{
                view: (base, state) => ({
                  ...base,

                  '& > img': {
                    margin: '0 auto',
                  },
                }),
              }}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </Wrapper>
  )
}

export default GalleryWithLightBox
