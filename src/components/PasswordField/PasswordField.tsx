import React, { useState } from 'react'
import { PasswordInput, Tooltip, createStyles } from '@mantine/core'

interface IProps {
  value: string
  setValue: (arg: string) => void
  label: string
  placeholder: string
  required?: boolean
}

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    height: 54,
  },
  innerInput: {
    top: 'initial',
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

function PasswordField({
  value,
  setValue,
  label,
  placeholder,
  required = false,
}: IProps) {
  const { classes } = useStyles()
  const [opened, setOpened] = useState(false)
  const valid = value.trim().length >= 6

  return (
    <Tooltip
      label={
        valid ? 'All good!' : 'Password must include at least 6 characters'
      }
      position="bottom-start"
      withArrow
      opened={opened}
      color={valid ? 'teal' : undefined}
    >
      <PasswordInput
        label={label}
        required={required}
        placeholder={placeholder}
        onFocus={() => setOpened(true)}
        onBlur={() => setOpened(false)}
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
        classNames={classes}
      />
    </Tooltip>
  )
}

export default PasswordField
