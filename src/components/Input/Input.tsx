import React from 'react'
import styled from 'styled-components'

export const StyledInput = styled.input`
  width: 280px;
  margin: 1rem 0.5rem;
  border: 1px solid #555;
  display: block;
  font-family: var(--font-contents);
  padding: 9px 4px 9px 40px;
  box-shadow: 1px 2px 2px hsl(var(--shadow-color) / 0.333),
    2px 4px 4px hsl(var(--shadow-color) / 0.333),
    3px 6px 6px hsl(var(--shadow-color) / 0.333);
`

interface IProps {
  type: string
  value: string
  onChange: () => void
}

function Input({ type = 'text', value, onChange }: IProps) {
  return <StyledInput type={type} value={value} onChange={onChange} />
}

export default Input
