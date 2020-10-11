import React from 'react'
import styled from '@emotion/styled'
import { MAIN_BACKGROUND } from 'src/styles/colors'

const Container = styled.footer`
  width: 100%;
  min-height: 400px;
  background: ${MAIN_BACKGROUND};
  padding: 0 4%;
  display: grid;
  grid-template-areas: . content .;
`

const Footer: React.FC = () => {
  return <Container></Container>
}

export default Footer
