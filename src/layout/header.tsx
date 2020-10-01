import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { Link } from 'gatsby'

const Container = styled.header`
  width: 100%;
  height: 68px;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 10%, rgba(0, 0, 0, 0));
  display: flex;
  flex-flow: row nowrap;
  position: sticky;
  z-index: 99999;
  top: 0;
  padding: 0 4%;
  margin-bottom: -68px;
`

const HeaderLogo = () => (
  <Link
    to={'/'}
    css={css`
      color: white;
      font-size: 2rem;
      display: flex;
      flex-flow: row;
      justify-content: center;
      align-items: center;
      text-decoration: none;
      font-weight: bold;
    `}
  >
    BmB
  </Link>
)

const Header: React.FC = () => {
  return (
    <Container>
      <HeaderLogo />
    </Container>
  )
}

export default Header
