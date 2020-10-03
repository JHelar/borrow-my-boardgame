import React from 'react'
import styled from '@emotion/styled'
import SEO, { Props as SEOProps } from './seo'
import Header from './header'
import Footer from './footer'
import { MAIN_BACKGROUND } from 'src/styles/colors'
import HomePage from './HomePage'

const Main = styled.main`
  min-height: 100vh;
  background-color: ${MAIN_BACKGROUND};
`

const Layout: React.FC<SEOProps> = ({ children, ...props }) => {
  return (
    <>
      <SEO {...props} />
      <Header />
      <Main>
        <HomePage>{children}</HomePage>
      </Main>
      <Footer />
    </>
  )
}

export default Layout
