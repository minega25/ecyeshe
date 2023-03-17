import {
  UnstyledButton,
  UnstyledButtonProps,
  Group,
  Text,
  createStyles,
} from '@mantine/core'
import { IconChevronRight } from '@tabler/icons'
import { useState } from 'react'
import AddServiceDetails from './AddServiceDetails'

const useStyles = createStyles((theme) => ({
  user: {
    display: 'block',
    width: '100%',
    padding: theme.spacing.md,
    margin: '2rem 0',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    backgroundColor: theme.colors.gray[0],
    borderRadius: '25px',
    '&:hover': {
      backgroundColor: theme.colors.gray[2],
    },
    '&:active': {
      backgroundColor: theme.colors.gray[1],
    },
  },
}))

interface ServiceCardProps extends UnstyledButtonProps {
  price?: string
  name: string
  duration?: string
  icon?: React.ReactNode
}

export default function ServiceCard({
  name,
  icon,
  price,
  duration,
  ...others
}: ServiceCardProps) {
  const { classes } = useStyles()
  const [showModal, setshowModal] = useState<boolean>(false)

  return (
    <>
      <UnstyledButton
        className={classes.user}
        {...others}
        onClick={() => setshowModal((prev) => !prev)}
      >
        <Group>
          <div style={{ flex: 1 }}>
            <Text size="sm" weight={500}>
              {name}
            </Text>

            {(price || duration) && (
              <Text color="dimmed" size="sm">
                RWF {price} for {duration}
              </Text>
            )}
          </div>

          {icon || <IconChevronRight size={14} stroke={1.5} />}
        </Group>
      </UnstyledButton>
      <AddServiceDetails
        name={name}
        showModal={showModal}
        setshowModal={setshowModal}
      />
    </>
  )
}
