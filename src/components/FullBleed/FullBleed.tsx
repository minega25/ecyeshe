import React from 'react'
import styled from 'styled-components'

const Full = styled.div`
  width: 100%;
  grid-column: 1 / 4 !important;
`

function FullBleed({ children }: any) {
  return <Full>{children}</Full>
}

export default FullBleed
