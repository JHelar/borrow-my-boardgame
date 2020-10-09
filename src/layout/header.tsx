import React, { useEffect, useState } from 'react'
import { css } from '@emotion/core'
import { Link } from 'gatsby'
import throttle from 'lodash.throttle'
import UserActions, { SearchFieldProps } from 'src/components/UserActions'

const Container: React.FC<SearchFieldProps> = ({ children, ...searchFieldProps }) => {
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    const onScroll = throttle(() => {
      const { top } = document.activeElement.getBoundingClientRect()
      if (top < 0) {
        setIsSticky(true)
      } else if (isSticky) {
        setIsSticky(false)
      }
    }, 50)

    document.addEventListener('scroll', onScroll)

    return () => {
      document.removeEventListener('scroll', onScroll)
    }
  })
  return (
    <header
      style={{ backgroundColor: isSticky ? 'rgb(20, 20, 20)' : 'transparent' }}
      css={css`
        width: 100%;
        height: 68px;
        background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 10%, rgba(0, 0, 0, 0));
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: space-between;
        position: sticky;
        z-index: 4;
        top: 0;
        padding: 0 4%;
        margin-bottom: -68px;
        transition: background-color 0.4s;
      `}
    >
      {children}
      <UserActions {...searchFieldProps} />
    </header>
  )
}

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

const Header: React.FC<SearchFieldProps> = (props) => {
  return (
    <Container {...props}>
      <HeaderLogo />
    </Container>
  )
}

export default Header
