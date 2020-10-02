import React from 'react'
import styled from '@emotion/styled'
import SEO, { Props as SEOProps } from './seo'
import Header from './header'
import Footer from './footer'
import { MAIN_BACKGROUND } from 'src/styles/colors'

const Main = styled.main`
  min-height: 100vh;
  background-color: ${MAIN_BACKGROUND};
  overflow-x: hidden;
`

const Layout: React.FC<SEOProps> = ({ children, ...props }) => (
  <>
    <SEO {...props} />
    <Header />
    <Main>{children}</Main>
    <Footer />
  </>
)

export default Layout
