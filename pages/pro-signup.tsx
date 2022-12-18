import React, { useState } from 'react'
import { createStyles, TextInput, Select } from '@mantine/core'
import styled from 'styled-components'

import Layout from 'src/components/Layout'
import Wrapper from 'src/components/Wrapper'
import PasswordField from 'src/components/PasswordField'
import { PrimaryButton } from 'src/components/Button'

const sources = [
  'Referred by my client',
  'Referred by a friend',
  'Instagram',
  'Facebook',
  'Google',
  'App store',
]

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
  },

  input: {
    height: 'auto',
    paddingTop: 18,
    marginTop: 10,
  },

  label: {
    position: 'absolute',
    pointerEvents: 'none',
    fontSize: theme.fontSizes.xs,
    paddingLeft: theme.spacing.sm,
    paddingTop: theme.spacing.sm / 2,
    zIndex: 1,
  },
}))

const Form = styled.form`
  width: min(50ch, 100%);
  margin: 0 auto;
`
const H4 = styled.h4`
  padding: 0.5rem 0;
  color: var(--color-primary);
`

const H3 = styled.h3`
  padding: 0.5rem 0;
`
const Submit = styled.div`
  width: 100%;
  margin: 2rem 0;
  text-align: center;
`

const ProSignup = () => {
  const { classes } = useStyles()
  const [password, setPassword] = useState('')

  return (
    <Layout>
      <Wrapper>
        <Form>
          <H4>List your business</H4>
          <H3>Grow your beauty or barber business risk free</H3>
          <TextInput
            label="First name"
            placeholder="Enter your first name"
            classNames={classes}
          />
          <TextInput
            label="Last name"
            placeholder="Enter your last name"
            classNames={classes}
          />
          <TextInput
            label="Email"
            type="email"
            placeholder="Enter your email"
            classNames={classes}
          />
          <PasswordField
            value={password}
            setValue={setPassword}
            label="Password"
            placeholder="Enter your password"
            required
          />
          <TextInput
            label="Phone number"
            type="tel"
            placeholder="Enter your phone number"
            classNames={classes}
          />
          <Select
            style={{ marginTop: 20, zIndex: 2 }}
            data={sources}
            placeholder="Pick one"
            label="Where did you hear about us?"
            classNames={classes}
          />
          <Submit>
            <PrimaryButton type="submit">Sign Up</PrimaryButton>
          </Submit>
        </Form>
      </Wrapper>
    </Layout>
  )
}

export default ProSignup
