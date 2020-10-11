import React, { useEffect, useRef, useState } from 'react'
import Listpage from 'src/components/Listpage'
import useBodyLock from 'src/hooks/useBodyLock'
import Layout from 'src/layout'
import { useFlexSearch } from 'react-use-flexsearch'
import { graphql } from 'gatsby'
import useGames from 'src/hooks/useGames'
import queryString from 'query-string'
import useSearch from 'src/hooks/useSearch'

type SearchPageState = {
  query?: string
}

type SearchPageData = {
  localSearchGames: {
    index: string
    store: string
  }
}

const SearchWrapper: React.FC<Pick<SearchPageData, 'localSearchGames'>> = ({ localSearchGames: { index, store } }) => {
  const { query } = useSearch()
  const results = useFlexSearch(query, index, store)
  const [boardgames, setBoardgames] = useState([])
  const games = useGames()

  useEffect(() => {
    if (games) {
      setBoardgames(results.map(({ id }) => games[id]))
    }
  }, [results, games])

  return <Listpage name={`Results for "${query}"`} boardgame={boardgames} />
}

const RentingPage: GatsbyPage<SearchPageData, unknown, SearchPageState> = ({ location, data }) => {
  const { setLocked } = useBodyLock()
  const defaultQuery = useRef((location.search && (queryString.parse(location.search).query as string)) || '')

  setLocked(false)
  return (
    <Layout title="Search" noHome defaultQuery={defaultQuery.current} expandByDefault={true}>
      <SearchWrapper localSearchGames={data.localSearchGames} />
    </Layout>
  )
}

export const query = graphql`
  query {
    localSearchGames {
      index
      store
    }
  }
`

export default RentingPage
