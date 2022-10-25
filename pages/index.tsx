import Image from 'next/image'
import styled from 'styled-components'

import Layout from 'src/components/Layout'
import SearchForm from 'src/components/SearchForm'
import { services } from 'src/data/services'
import ServiceCard from 'src/components/ServiceCard'

const Hero = styled.section`
  display: flex;
  align-items: center;
`

const Heading1 = styled.h1`
  font-family: var(--font-contents);
  font-size: 2.2rem;
  font-weight: 700;
  line-height: 1;
  color: var(--color-text);
`

const CTA = styled.div`
  flex: 0 0 50%;
  padding: 0 1rem;
`

const HeroImages = styled.div`
  flex: 0 0 50%;
  padding: 0 1rem;
  &:first-child {
    padding: 5rem 0;
  }
`

const StyledImage = styled.img`
  position: absolute;
  width: 50%;
  max-width: 283px;
  z-index: 2;
  bottom: 60px;
  right: 90px;
  padding: 0 10px;
  display: block;
  vertical-align: middle;
  border-style: none;
`

const Services = styled.section`
  margin: 3rem;
  text-align: center;
`

const ServicesList = styled.div`
  display: flex;
  margin: 2rem 0;
  flex-wrap: wrap;
  justify-content: space-between;
`

interface IProps {}

export default function Home({}: IProps) {
  return (
    <Layout>
      <Hero>
        <CTA>
          <Heading1>Discover & book local beauty professionals</Heading1>
          <SearchForm />
        </CTA>
        <HeroImages>
          <Image
            src="/adrian-fernandez.jpg"
            width="538"
            height="518"
            alt="adrian"
          />
          <StyledImage src="/clarissa-carbungco.jpg" alt="clarissa" />
        </HeroImages>
      </Hero>
      <Services>
        <Heading1>Find top pros by service</Heading1>
        <ServicesList>
          {services.map(({ name, href, image }, index) => (
            <ServiceCard key={index} name={name} href={href} image={image} />
          ))}
        </ServicesList>
      </Services>
    </Layout>
  )
}
