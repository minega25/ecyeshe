import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'

const ServiceContainer = styled.div`
  margin: 0.5rem;
  max-width: 280px;
  width: 280px;
  cursor: pointer;
`

const ServiceName = styled.span`
  display: block;
  border: 5px solid var(--color-primary);
  min-width: 280px;
  width: 280px;
  text-align: center;
  margin: 0 auto;
  margin-top: -0.49rem;
  padding: 0.5rem 0;
  font-family: var(--font-contents);
  font-weight: 700;
`

const StyledImg = styled(Image)`
  margin: 0;
`

interface IService {
  image: string
  name: string
  href: string
}

const ServiceCard = ({ image, name, href }: IService) => {
  return (
    <ServiceContainer>
      <Link href={href}>
        <StyledImg src={image} alt="" width="280" height="280" />
      </Link>
      <Link href={href}>
        <ServiceName>{name}</ServiceName>
      </Link>
    </ServiceContainer>
  )
}

export default ServiceCard
