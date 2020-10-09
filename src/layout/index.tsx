import React, { useState } from 'react'
import styled from '@emotion/styled'
import SEO, { Props as SEOProps } from './seo'
import Header from './header'
import Footer from './footer'
import { MAIN_BACKGROUND } from 'src/styles/colors'
import HomePage from './HomePage'
import { BodyLockContext } from 'src/contexts'
import GameModal from './GameModal'

const Main = styled.main`
  min-height: 100vh;
  background-color: ${MAIN_BACKGROUND};
`

const Layout: React.FC<SEOProps & { noHome?: boolean }> = ({ children, noHome, ...props }) => {
  const [locked, setLocked] = useState(false)
  return (
    <BodyLockContext.Provider value={{ locked, setLocked }}>
      <SEO {...props} />
      <GameModal>
        <Header />
        <Main>{noHome ? children : <HomePage>{children}</HomePage>}</Main>
        <Footer />
      </GameModal>
    </BodyLockContext.Provider>
  )
}

export default Layout
