import React from 'react'
import { DialogOverlay, DialogContent } from '@reach/dialog'
import '@reach/dialog/styles.css'
import styled from 'styled-components'

const Content = styled(DialogContent)`
  display: block;
  width: 400px;
`

interface IProps {
  children: React.ReactNode
  isOpen: boolean | undefined
  setIsOpen: (arg0: boolean) => void
}

function Modal({ children, isOpen, setIsOpen }: IProps) {
  return (
    <div>
      <DialogOverlay isOpen={isOpen} onDismiss={() => setIsOpen(!isOpen)}>
        <Content style={{ boxShadow: '0px 10px 50px hsla(0, 0%, 0%, 0.33)' }}>
          {children}
        </Content>
      </DialogOverlay>
    </div>
  )
}

export default Modal
