import React from 'react'
import styled from 'styled-components'

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr min(1300px, 100%) 1fr;

  & > * {
    grid-column: 2;
  }
`

function Wrapper({ children }: any) {
  return <Grid>{children}</Grid>
}

export default Wrapper
