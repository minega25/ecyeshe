import { useState } from 'react'
import { TextInput, ActionIcon, useMantineTheme } from '@mantine/core'
import { IconSearch, IconArrowRight, IconArrowLeft } from '@tabler/icons'

interface IProps {
  placeholder: string
  onChange?: (args: string) => void
}

function SearchInput({ placeholder, onChange }: IProps) {
  const [searchTerms, setSearchTerms] = useState('')
  const theme = useMantineTheme()

  const handleOnChange = (event: any) => {
    const { value } = event.target
    setSearchTerms(value)
    if (onChange) onChange(value)
  }

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
      value={searchTerms}
      onChange={handleOnChange}
    />
  )
}

export default SearchInput
