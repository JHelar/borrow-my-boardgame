import React, { useState } from 'react'
import styled from '@emotion/styled'
import SEO, { Props as SEOProps } from './seo'
import Header from './header'
import Footer from './footer'
import { MAIN_BACKGROUND } from 'src/styles/colors'
import HomePage from './HomePage'
import { BodyLockContext, SearchContext } from 'src/contexts'
import GameModal from './GameModal'
import { SearchFieldProps } from 'src/components/UserActions'
import { css, Global } from '@emotion/core'

const Main = styled.main`
  min-height: 100vh;
  background-color: ${MAIN_BACKGROUND};
`

const Layout: React.FC<SEOProps & { noHome?: boolean } & SearchFieldProps> = ({
  children,
  noHome,
  defaultQuery,
  expandByDefault,
  ...props
}) => {
  const [locked, setLocked] = useState(false)
  const [query, setQuery] = useState('')
  return (
    <BodyLockContext.Provider value={{ locked, setLocked }}>
      <SearchContext.Provider value={{ query, setQuery }}>
        <Global
          styles={css`
          html {
            overflow${locked ? ': hidden' : '-x: hidden'};
          }`}
        />
        <SEO {...props} />
        <GameModal>
          <Header defaultQuery={defaultQuery} expandByDefault={expandByDefault} />
          <Main>{noHome ? children : <HomePage>{children}</HomePage>}</Main>
          <Footer />
        </GameModal>
      </SearchContext.Provider>
    </BodyLockContext.Provider>
  )
}

export default Layout
