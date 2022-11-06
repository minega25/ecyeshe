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
  &:hover {
    background-color: var(--color-background);
    border: 2px solid var(--color-primary);
  }
`

const SubmitButton = styled.button`
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  max-width: 47px;
  max-height: 47px;
  width: 47px;
  height: 47px;
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
  &:hover {
    background-color: var(--color-background);
    border: 1px solid var(--color-primary);
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
  transition: all 0.2s ease-in-out;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  word-break: break-word;
  text-decoration: none;
  box-sizing: border-box;
  &:hover {
    cursor: pointer;
    padding: 0.5rem 1rem;
    background-color: var(--color-background);
    border: 3px solid var(--color-primary);
  }
`

interface ButtonProps {
  children: React.ReactNode | null
  href?: string
}

function Button({ children, href = '#' }: ButtonProps) {
  return (
    <Link passHref href={href}>
      <ButtonLink>{children}</ButtonLink>
    </Link>
  )
}

export function ButtonSearch({ children }: ButtonProps) {
  return <SubmitButton type="submit">{children}</SubmitButton>
}

export default Button
