import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { createStyles, Text, LoadingOverlay } from '@mantine/core'
import { useListState } from '@mantine/hooks'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { IconGripVertical, IconEdit } from '@tabler/icons'

import Wrapper from '../Wrapper/Wrapper'
import { PrimaryButton } from '../Button'
import AddService from './AddService'
import { firebaseAuth } from 'src/auth/initFirebase'
import AddServiceDetails from './AddServiceDetails'

const InnerWrapper = styled.div`
  max-width: 40rem;
  margin: 0 auto;
`

const Sp = styled.span`
  margin: 1rem 0;
  display: block;
`

const useStyles = createStyles((theme) => ({
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: theme.radius.md,
    border: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    padding: `${theme.spacing.sm}px ${theme.spacing.xl}px`,
    paddingLeft: theme.spacing.xl - theme.spacing.md, // to offset drag handle
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white,
    marginBottom: '0.5rem',
    minWidth: '24rem',
  },

  itemDragging: {
    boxShadow: theme.shadows.sm,
  },

  symbol: {
    fontSize: 30,
    fontWeight: 700,
    width: 60,
  },

  dragHandle: {
    ...theme.fn.focusStyles(),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[1]
        : theme.colors.gray[6],
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },

  edit: {
    cursor: 'pointer',
  },
}))

interface DndListHandleProps {
  data: {
    price: string
    duration: string
    name: string
    description: string
  }[]
}

export function DndListHandle({ data }: DndListHandleProps) {
  const { classes, cx } = useStyles()
  const [state, handlers] = useListState(data)
  const [showModal, setshowModal] = useState(false)
  const [name, setName] = useState('')

  useEffect(() => {
    handlers.setState(data)
  }, [data])

  const handleEditService = (name: string) => {
    setshowModal(true)
    setName(name)
  }

  const items =
    state &&
    state.map((item, index) => (
      <Draggable key={item.name} index={index} draggableId={item.name}>
        {(provided, snapshot) => (
          <div
            className={cx(classes.item, {
              [classes.itemDragging]: snapshot.isDragging,
            })}
            ref={provided.innerRef}
            {...provided.draggableProps}
          >
            <div {...provided.dragHandleProps} className={classes.dragHandle}>
              <IconGripVertical size={18} stroke={1.5} />
            </div>
            <div>
              <Text>{item.name}</Text>
              <Text color="dimmed" size="sm">
                RWF {item.price} for {item.duration}
              </Text>
            </div>
            <div
              className={classes.edit}
              onClick={() => handleEditService(item.name)}
            >
              <IconEdit size={18} stroke={1.5} />
            </div>
          </div>
        )}
      </Draggable>
    ))

  return (
    <DragDropContext
      onDragEnd={({ destination, source }) =>
        handlers.reorder({ from: source.index, to: destination?.index || 0 })
      }
    >
      <Droppable droppableId="dnd-list" direction="vertical">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {items}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <AddServiceDetails
        name={name}
        showModal={showModal}
        setshowModal={setshowModal}
      />
    </DragDropContext>
  )
}

const ServiceMenu = () => {
  const [showModal, setshowModal] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [currentServiceDetails, setCurrentServiceDetails] = useState([])

  useEffect(() => {
    if (firebaseAuth.currentUser?.email) {
      setLoading(true)
      fetch('/api/get-single-business', {
        method: 'POST',
        body: JSON.stringify({
          email: firebaseAuth.currentUser?.email,
        }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json()
          }
        })
        .then((data) => {
          const business = data?.allBusinessesByEmail?.data || null
          if (business) {
            const { serviceDetails, _id } = business[0]
            const serviceDetailsArr = JSON.parse(serviceDetails)
            setCurrentServiceDetails(serviceDetailsArr)

            setLoading(false)
          }
        })
        .catch((e) => console.log(e))
    }
  }, [])

  return (
    <Wrapper>
      <LoadingOverlay visible={loading} overlayBlur={2} />

      <InnerWrapper>
        <Sp />
        <PrimaryButton onClick={() => setshowModal((prev) => !prev)}>
          Add Service
        </PrimaryButton>
        <Sp />
        <DndListHandle data={currentServiceDetails} />
      </InnerWrapper>

      <AddService showModal={showModal} setshowModal={setshowModal} />
    </Wrapper>
  )
}

export default ServiceMenu
