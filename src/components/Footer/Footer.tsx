// @ts-nocheck
import React from 'react'
import dynamic from 'next/dynamic'

function Footer() {
  //@ts-ignore
  const SimpleReactFooter = dynamic(() => import('simple-react-footer'), {
    ssr: false,
  })

  const description =
    'eCyeshe is the online destination for beauty & wellness professionals and clients. Professionals can showcase their work, connect with new and existing clients, and build their business. Clients can discover new services and providers, book appointments online, and get inspired.'
  const title = 'About eCyeshe'
  const columns = [
    {
      title: 'Resources',
      resources: [
        {
          name: 'About',
          link: '/about',
        },
        {
          name: 'Careers',
          link: '/careers',
        },
        {
          name: 'Contact',
          link: '/contact',
        },
        {
          name: 'Privacy',
          link: '/privacy',
        },
      ],
    },
    {
      title: 'Legal',
      resources: [
        {
          name: 'Privacy',
          link: '/privacy',
        },
        {
          name: 'Terms',
          link: '/terms',
        },
      ],
    },
  ]

  return (
    <SimpleReactFooter
      description={description}
      title={title}
      columns={columns}
      linkedin="fluffy_cat_on_linkedin"
      facebook="fluffy_cat_on_fb"
      twitter="fluffy_cat_on_twitter"
      instagram="fluffy_cat_live"
      youtube="UCFt6TSF464J8K82xeA?"
      pinterest="fluffy_cats_collections"
      copyright="eCyeshe, Inc. All rights reserved"
      iconColor="black"
      backgroundColor="white"
      fontColor="black"
      fontFamily="Madreu"
      copyrightColor="black"
    />
  )
}

export default Footer
