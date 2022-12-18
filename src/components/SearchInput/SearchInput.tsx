import { TextInput, ActionIcon, useMantineTheme } from '@mantine/core'
//@ts-ignore
import { IconSearch, IconArrowRight, IconArrowLeft } from '@tabler/icons'

interface IProps {
  placeholder: string
}

export default function InputWithButton({ placeholder }: IProps) {
  const theme = useMantineTheme()

  return (
    <TextInput
      icon={<IconSearch size={18} stroke={1.5} />}
      radius="xl"
      size="md"
      rightSection={
        <ActionIcon
          size={32}
          radius="xl"
          color={theme.primaryColor}
          variant="filled"
        >
          {theme.dir === 'ltr' ? (
            <IconArrowRight size={18} stroke={1.5} />
          ) : (
            <IconArrowLeft size={18} stroke={1.5} />
          )}
        </ActionIcon>
      }
      placeholder={placeholder}
      rightSectionWidth={60}
    />
  )
}
