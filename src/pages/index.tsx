import React from 'react'
import useBodyLock from 'src/hooks/useBodyLock'
import Layout from 'src/layout'

const HomePage: GatsbyPage = () => {
  const { setLocked } = useBodyLock()
  setLocked(false)
  return <Layout title="Home"></Layout>
}

export default HomePage
