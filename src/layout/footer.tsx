import React from 'react'
import styled from '@emotion/styled'
import { MAIN_BACKGROUND } from 'src/styles/colors'

const Container = styled.footer`
  width: 100%;
  min-height: 400px;
  background: ${MAIN_BACKGROUND};
  padding: 0 4%;
`

const Footer: React.FC = () => {
  return <Container>Footer</Container>
}

export default Footer
