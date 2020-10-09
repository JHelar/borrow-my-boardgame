import React, { useEffect, useRef, useState } from 'react'
import Listpage from 'src/components/Listpage'
import useBodyLock from 'src/hooks/useBodyLock'
import Layout from 'src/layout'
import firebase from 'gatsby-plugin-firebase'
import { useObjectVal } from 'react-firebase-hooks/database'

type SearchPageState = {
  query?: string
}

const RentingPage: GatsbyPage<unknown, unknown, SearchPageState> = ({ location: { state } }) => {
  const { setLocked } = useBodyLock()
  const [query, setQuery] = useState((state && state.query) || '')
  const [boardgames, loading] = useObjectVal<any[]>(
    firebase
      .database()
      .ref('games')
      .orderByChild('name')
      .startAt(query.toUpperCase())
      .endAt(query.toLowerCase() + '\uf8ff')
  )
  console.log({
    boardgames,
  })
  useEffect(() => {
    if (state && state.query) {
      setQuery(state.query)
    }
  }, [state])
  setLocked(false)
  return (
    <Layout title="Search" noHome defaultQuery={query} expandByDefault={query ? true : false}>
      <Listpage name={`Results for "${query}"`} boardgame={boardgames || []} />
    </Layout>
  )
}

export default RentingPage
