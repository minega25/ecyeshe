import React, { Children } from "react";
import Link from "next/link";
import styled from "styled-components";

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
  transition: all .2s ease-in-out;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  word-break: break-word;
  text-decoration: none;
  &:hover {
    background-color: var(--color-background);
    border: 2px solid var(--color-primary);
  }
`;

const ButtonSearchLink = styled.a`
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
  transition: all .2s ease-in-out;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  word-break: break-word;
  text-decoration: none;
  &:hover {
    background-color: var(--color-background);
    border: 1px solid var(--color-primary);
    padding: 2px 6px;
  }  
`;

interface ButtonProps {
  children: React.ReactNode | null;
  href: string | "#"
}

function Button({ children, href }: ButtonProps) {
  return <Link passHref href={href}><ButtonLink>{children}</ButtonLink></Link>;
}

export function ButtonSearch({ children, href }: ButtonProps) {
  return <Link passHref href={href}><ButtonSearchLink>{children}</ButtonSearchLink></Link>;
}

export default Button;
