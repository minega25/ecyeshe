import { ChangeEvent, useState } from 'react'
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox'
import styled from 'styled-components'
import '@reach/combobox/styles.css'

const StyledCbInput = styled(ComboboxInput)`
  width: 260px;
  margin: 0 0.5rem;
  border: 1px solid #555;
  display: block;
  font-family: var(--font-contents);
  padding: 9px 4px 9px 40px;
  background: white
    url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='24px' height='24px' viewBox='0 0 24 24' version='1.1'%3E%3Cg id='surface1'%3E%3Cpath style=' stroke:none;fill-rule:nonzero;fill:rgb(0%25,0%25,0%25);fill-opacity:1;' d='M 23.699219 22.28125 L 16.8125 15.390625 C 18.167969 13.761719 18.984375 11.679688 18.984375 9.410156 C 18.984375 4.226562 14.730469 0.0117188 9.496094 0.0117188 C 4.265625 0.0117188 0 4.230469 0 9.414062 C 0 14.597656 4.253906 18.8125 9.488281 18.8125 C 11.710938 18.8125 13.757812 18.050781 15.378906 16.777344 L 22.289062 23.6875 C 22.695312 24.089844 23.292969 24.089844 23.699219 23.6875 C 24.101562 23.285156 24.101562 22.683594 23.699219 22.28125 Z M 2.015625 9.414062 C 2.015625 5.339844 5.371094 2.03125 9.488281 2.03125 C 13.605469 2.03125 16.960938 5.339844 16.960938 9.414062 C 16.960938 13.488281 13.605469 16.796875 9.488281 16.796875 C 5.371094 16.796875 2.015625 13.480469 2.015625 9.414062 Z M 2.015625 9.414062 '/%3E%3C/g%3E%3C/svg%3E")
    no-repeat 13px center;
  box-shadow: 1px 2px 2px hsl(var(--shadow-color) / 0.333),
    2px 4px 4px hsl(var(--shadow-color) / 0.333),
    3px 6px 6px hsl(var(--shadow-color) / 0.333);
`

interface IServiceSearchBoxProps {
  onSelectService: (service: string) => void
  defaultValue: string | undefined
  allBusinessesAndServices: string[]
}

export default function ServiceSearchBox({
  defaultValue,
  onSelectService,
  allBusinessesAndServices,
}: IServiceSearchBoxProps) {
  return (
    <ReadyServiceSearchBox
      defaultValue={defaultValue}
      onSelectService={onSelectService}
      allBusinessesAndServices={allBusinessesAndServices}
    />
  )
}

function ReadyServiceSearchBox({
  defaultValue,
  onSelectService,
  allBusinessesAndServices = [],
}: IServiceSearchBoxProps) {
  const [service, setService] = useState<string>(defaultValue || '')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setService(e.target.value)
    if (e.target.value === '') {
      onSelectService('')
    }
  }

  const handleSelect = async (service: string) => {
    setService(service)
    onSelectService(service)
  }

  return (
    <Combobox onSelect={handleSelect}>
      <StyledCbInput
        placeholder="Service, Stylist or salon"
        value={service}
        onChange={handleChange}
        autoComplete="off"
      />
      <ComboboxPopover>
        <ComboboxList>
          {allBusinessesAndServices.map((curr, index) => {
            return <ComboboxOption key={index} value={curr} />
          })}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  )
}
