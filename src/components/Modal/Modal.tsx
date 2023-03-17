import React from 'react'
import { DialogOverlay, DialogContent } from '@reach/dialog'
import '@reach/dialog/styles.css'
import styled from 'styled-components'
import Image from 'next/image'

const Content = styled(DialogContent)`
  display: block;
`

const CloseBtn = styled.button`
  width: 100%;
  text-align: right;
  cursor: pointer;
  margin: 0;
  padding: 0;
`

interface IProps {
  children: React.ReactNode
  isOpen: boolean | undefined
  setIsOpen: (arg0: boolean) => void
  width?: string
}

function Modal({ children, isOpen, setIsOpen, width }: IProps) {
  return (
    <div>
      <DialogOverlay isOpen={isOpen} onDismiss={() => setIsOpen(!isOpen)}>
        <Content
          style={{
            boxShadow: '0px 10px 50px hsla(0, 0%, 0%, 0.33)',
            width: width || '400px',
          }}
        >
          <CloseBtn onClick={() => setIsOpen(!isOpen)}>
            <Image src="/close.svg" width="30" height="30" alt="close" />
          </CloseBtn>
          {children}
        </Content>
      </DialogOverlay>
    </div>
  )
}

export default Modal
