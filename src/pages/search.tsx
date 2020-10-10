import React, { useEffect, useState } from 'react'
import Listpage from 'src/components/Listpage'
import useBodyLock from 'src/hooks/useBodyLock'
import Layout from 'src/layout'
import { useFlexSearch } from 'react-use-flexsearch'
import { graphql } from 'gatsby'
import useGames from 'src/hooks/useGames'
import queryString from 'query-string'

type SearchPageState = {
  query?: string
}

type SearchPageData = {
  localSearchGames: {
    index: string
    store: string
  }
}

const RentingPage: GatsbyPage<SearchPageData, unknown, SearchPageState> = ({
  location,
  data: {
    localSearchGames: { index, store },
  },
}) => {
  const { setLocked } = useBodyLock()
  const query = (location.search && (queryString.parse(location.search).query as string)) || ''
  const results = useFlexSearch(query, index, store)
  const [boardgames, setBoardgames] = useState([])
  const games = useGames()

  useEffect(() => {
    if (games) {
      setBoardgames(results.map(({ id }) => games[id]))
    }
  }, [results, games])

  setLocked(false)
  return (
    <Layout title="Search" noHome defaultQuery={query} expandByDefault={true}>
      <Listpage name={`Results for "${query}"`} boardgame={boardgames} />
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
