import React from 'react'
import { createStyles, TextInput } from '@mantine/core'
import styled from 'styled-components'

import Wrapper from 'src/components/Wrapper'
import { PrimaryButton } from 'src/components/Button'

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

const Submit = styled.div`
  width: 100%;
  margin: 2rem 0;
  text-align: center;
`

const BusinessProfile = () => {
  const { classes } = useStyles()

  return (
    <Wrapper>
      <Form>
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
          label="Phone number"
          type="tel"
          placeholder="Enter your phone number"
          classNames={classes}
        />
        <Submit>
          <PrimaryButton type="submit">Update</PrimaryButton>
        </Submit>
      </Form>
    </Wrapper>
  )
}

export default BusinessProfile
