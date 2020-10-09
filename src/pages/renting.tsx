import React, { useEffect, useState } from 'react'
import Listpage from 'src/components/Listpage'
import useAuth from 'src/hooks/useAuth'
import useBodyLock from 'src/hooks/useBodyLock'
import Layout from 'src/layout'
import firebase from 'gatsby-plugin-firebase'
import { useObjectVal } from 'react-firebase-hooks/database'

const RentingPage: GatsbyPage<unknown, unknown> = () => {
  const { setLocked } = useBodyLock()
  const [loggedIn, user] = useAuth()
  const [boardgames, setBoardgames] = useState([])
  const [userValue, loadingUserValue] = useObjectVal(firebase.database().ref('users/' + (user && user.uid)))

  useEffect(() => {
    const fetchRentalGames = async () => {
      const { renting } = userValue as {
        renting: string[]
      }
      if (!renting || !renting.length) {
        setBoardgames([])
        return
      }

      const rentingGames = await Promise.all(
        renting
          .map((gameId) =>
            firebase
              .database()
              .ref('games/' + gameId)
              .once('value')
              .then((gameValue) => gameValue.val())
          )
          .filter(Boolean)
      )
      setBoardgames(rentingGames)
    }
    if (loggedIn && userValue && !loadingUserValue) {
      fetchRentalGames()
    } else if (loggedIn && !userValue && !loadingUserValue) {
      setBoardgames([])
    }
  }, [loggedIn, loadingUserValue, userValue])

  setLocked(false)
  return (
    <Layout title="My rentals" noHome>
      <Listpage name={loadingUserValue ? `Loading...` : `My rentals`} boardgame={boardgames} />
    </Layout>
  )
}

export default RentingPage
