import firebase from 'gatsby-plugin-firebase'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useObjectVal } from 'react-firebase-hooks/database'
import useAuth from './useAuth'
import useGames, { Game } from './useGames'

const useGame = (gameId: string): [game: Game, rent: () => void, renting: boolean] => {
  const [_, user] = useAuth()
  const gameRef = useRef(firebase.database().ref('games/' + gameId))
  const [game, loading, error] = useObjectVal<Game>(gameRef.current)
  const [renting, setRenting] = useState(false)
  const games = useGames()
  useEffect(() => {
    if (!game && !loading && games) {
      firebase
        .database()
        .ref('games')
        .set({
          ...games,
          [gameId]: {
            rented: false,
            rentedBy: null,
          },
        })
    }
  }, [game, games, gameId, loading])

  const rentGame = useCallback(() => {
    if (game) {
      setRenting(true)
      gameRef.current.set(
        {
          rented: true,
          rentedBy: user.uid,
        },
        (rentError) => {
          setRenting(false)
        }
      )
    }
  }, [game, user])

  return [game, rentGame, renting]
}

export default useGame
