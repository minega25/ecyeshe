import { createStyles, Avatar, Text, Group } from '@mantine/core'
import { IconHeart, IconShare, IconStar } from '@tabler/icons'

const useStyles = createStyles((theme) => ({
  icon: {
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[3]
        : theme.colors.gray[5],
  },

  name: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}))

interface UserInfoIconsProps {
  avatar: string
  name: string
  title: string
  businessName: string
}

export default function UserInfo({
  avatar,
  name,
  title,
  businessName,
}: UserInfoIconsProps) {
  const { classes } = useStyles()
  return (
    <div>
      <Group noWrap>
        <Avatar src={avatar} size={140} radius={140} />
        <div>
          <Text size="lg" weight={500} className={classes.name}>
            {name}
          </Text>

          <Text
            size="xs"
            sx={{ textTransform: 'uppercase' }}
            weight={700}
            color="hsl(322deg, 100%, 54%)"
          >
            {title}
          </Text>
          <Text size="xs" color="dimmed">
            Business Name: {businessName}
          </Text>

          <Group noWrap spacing={10} mt={5} color="dimmed">
            <IconStar color="grey" />
            <IconStar color="grey" />
            <IconStar color="grey" />
            <IconStar color="grey" />
            <IconStar color="grey" />
          </Group>
          <Group noWrap spacing={10} mt={5} color="dimmed">
            <IconHeart color="grey" />
            <IconShare color="grey" />
          </Group>
        </div>
      </Group>
    </div>
  )
}
