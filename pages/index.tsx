import Image from 'next/image'
import styled from 'styled-components'

import Layout from 'src/components/Layout'
import SearchForm from 'src/components/SearchForm'
import { services } from 'src/data/services'
import ServiceCard from 'src/components/ServiceCard'
import Wrapper from 'src/components/Wrapper'

const Hero = styled.section`
  position: relative;
  background-color: #ebebeb;
  background-image: url('/homepage_banner.jpg');
  background-repeat: no-repeat;
  display: flex;
  height: 500px;
  margin-bottom: 25px;
  padding: 16px;
  background-size: cover;
  background-position: 320px;
  align-items: center;
  color: #7a7d7c;
  font-size: 16px;
  line-height: 19px;
  padding: 16px 15px;
  width: 100%;
  z-index: 2;
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
  max-width: 283px;
  z-index: 2;
  bottom: 60px;
  right: 90px;
  display: block;
  vertical-align: middle;
  border-style: none;
`

const Services = styled.section`
  margin: 1rem;
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
      </Hero>
      <Wrapper>
        <Services>
          <Heading1>Find top pros by service</Heading1>
          <ServicesList>
            {services.map(({ name, href, image }, index) => (
              <ServiceCard key={index} name={name} href={href} image={image} />
            ))}
          </ServicesList>
        </Services>
      </Wrapper>
    </Layout>
  )
}
