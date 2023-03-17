import { useEffect, useState } from 'react'
import styled from 'styled-components'

import Modal from '../Modal/Modal'
import SearchInput from '../SearchInput/SearchInput'
import ServiceCard from './ServiceCard'

const Separator = styled.span`
  font-size: medium;
  text-align: center;
  font-weight: 700;
  font-family: var(--font-contents);
  margin: 1rem;
  width: 100%;
  display: block;
  padding: 1rem;
`

const Section = styled.section`
  margin: 2rem 0;
`

interface IAddServiceProps {
  showModal: boolean
  setshowModal: (arg: boolean) => void
  existingServices?: [string]
}
interface IFormData {
  name: string
  price: string
  duration: string
  description: string
}

const AddService = ({ showModal, setshowModal }: IAddServiceProps) => {
  const [services, setServices] = useState([])
  const [searchedServices, setSearchedServices] = useState([])
  const [searchTerms, setSearchTerms] = useState<string | null>()

  useEffect(() => {
    fetch('/api/get-all-services', {
      method: 'POST',
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
      })
      .then((data) => {
        setServices(data?.allServices?.data)
        setSearchedServices(data?.allServices?.data)
      })
  }, [])

  useEffect(() => {
    if (services.length > 0) {
      const result = services.filter((service: IFormData) =>
        service?.name.toLowerCase().includes(searchTerms?.toLowerCase() || ''),
      )
      setSearchedServices(result)
    }
  }, [searchTerms])

  const handleSearchInput = (value: string) => {
    setSearchTerms(value)
  }

  return (
    <Modal isOpen={showModal} setIsOpen={setshowModal}>
      <Separator>Add services</Separator>
      <SearchInput
        onChange={handleSearchInput}
        placeholder="Search your services"
      />
      <Section>
        {searchedServices &&
          searchedServices.length > 0 &&
          searchedServices.map(({ name }) => (
            <ServiceCard key={name} name={name} />
          ))}
      </Section>
    </Modal>
  )
}

export default AddService
