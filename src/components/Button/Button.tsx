import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'

const ButtonLink = styled.a`
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  color: var(--color-text);
  padding: 10px 20px;
  border-radius: 0;
  font-family: var(--font-headings);
  font-weight: 700;
  font-size: 1.25rem;
  border-width: 2px;
  font-style: normal;
  margin: 0.4rem 0.8rem;
  line-height: 1.5;
  white-space: normal;
  transition: all 0.2s ease-in-out;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  word-break: break-word;
  text-decoration: none;
  border: 3px solid transparent;
  &:hover {
    background-color: var(--color-background);
    border: 3px solid var(--color-primary);
  }
`

const SubmitButton = styled.button`
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  max-width: 35px;
  max-height: 35px;
  width: 35px;
  height: 35px;
  color: var(--color-text);
  border-radius: 0;
  font-family: var(--font-headings);
  font-weight: 700;
  font-size: 1.25rem;
  border-width: 2px;
  font-style: normal;
  margin: 0rem 0.8rem;
  line-height: 1.5;
  white-space: normal;
  transition: all 0.2s ease-in-out;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  word-break: break-word;
  text-decoration: none;
  border: 3px solid transparent;
  &:hover {
    background-color: var(--color-background);
    border: 3px solid var(--color-primary);
  }
`

export const PrimaryButton = styled.button`
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  width: fit-content;
  padding: 0.5rem 1rem;
  color: var(--color-text);
  border-radius: 0;
  font-family: var(--font-headings);
  font-weight: 700;
  font-size: 1.25rem;
  border-width: 2px;
  font-style: normal;
  margin: 0rem 0.8rem;
  line-height: 1.5;
  white-space: normal;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  word-break: break-word;
  text-decoration: none;
  box-sizing: border-box;
  max-height: min-content;
  border: 3px solid transparent;
  &:disabled {
    cursor: not-allowed !important;
    pointer-events: all !important;
    background-color: var(--color-background);
    border: 3px solid var(--color-gray-700);
  }
  &:hover {
    cursor: pointer;
    background-color: var(--color-background);
    border: 3px solid var(--color-primary);
  }
  &:disabled:hover {
    border: 3px solid var(--color-gray-900);
  }
`

interface ButtonProps {
  children: React.ReactNode | null
  href?: string
  disabled?: boolean
}

function Button({ children, href = '#' }: ButtonProps) {
  return (
    <Link passHref href={href}>
      <ButtonLink>{children}</ButtonLink>
    </Link>
  )
}

export function ButtonSearch({ children, disabled = false }: ButtonProps) {
  return (
    <SubmitButton type="submit" disabled={disabled}>
      {children}
    </SubmitButton>
  )
}

export default Button
