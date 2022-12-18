import React from 'react'
import styled from 'styled-components'
import { Button, Group } from '@mantine/core'
import {
  IconDownload,
  IconUpload,
  IconUserCircle,
  IconCirclePlus,
} from '@tabler/icons'

import SearchInput from '../SearchInput'

const ClientWrapper = styled.div`
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`

const Content = styled.div`
  max-width: 420px;
  text-align: center;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  & > * {
    margin: 1rem;
  }
`

function Clients() {
  return (
    <ClientWrapper>
      <Header>
        <SearchInput placeholder="Search name or phone number" />
        <Group>
          <Button leftIcon={<IconDownload size={16} />} variant="default">
            Export Client List
          </Button>
          <Button leftIcon={<IconUpload size={16} />} variant="default">
            Import Phone Contacts
          </Button>
        </Group>
      </Header>
      <Content>
        <h3>Add your clients and invite them to book an appointment</h3>
        <Button
          leftIcon={<IconUserCircle size={16} />}
          variant="default"
          sx={(theme) => ({
            backgroundColor:
              theme.colors.dark[theme.colorScheme === 'dark' ? 9 : 6],
            color: '#fff',
            '&:hover': {
              backgroundColor:
                theme.colors.dark[theme.colorScheme === 'dark' ? 9 : 6],
            },
          })}
        >
          Add clients From Contacts
        </Button>
        <Button leftIcon={<IconUserCircle size={16} />} variant="default">
          Add clients From Contacts
        </Button>
      </Content>
    </ClientWrapper>
  )
}

export default Clients
