import firebase from 'gatsby-plugin-firebase'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useObjectVal } from 'react-firebase-hooks/database'
import useAuth from './useAuth'
import { Game } from './useGames'

const useGame = (gameId?: string): [game: Game, rent: () => void, renting: boolean, returnGame: () => void] => {
  const [_, user] = useAuth()
  const gameRef = firebase.database().ref('games/' + gameId)
  const [game, loading, error] = useObjectVal<Game>(gameRef)
  const [renting, setRenting] = useState(false)

  const rentGame = useCallback(() => {
    if (game && !renting) {
      setRenting(true)
      gameRef.update(
        {
          rented: true,
          rentedBy: user.uid,
        },
        (rentError) => {
          setRenting(false)
        }
      )
    }
  }, [game, user, renting, gameRef])

  const giveBackGame = useCallback(() => {
    if (game && !renting) {
      setRenting(true)
      gameRef.set(
        {
          rented: false,
          rentedBy: null,
        },
        (rentError) => {
          setRenting(false)
        }
      )
    }
  }, [game, renting, gameRef])

  return [gameId && game, rentGame, renting, giveBackGame]
}

export default useGame
