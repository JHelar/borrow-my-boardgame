import firebase from 'gatsby-plugin-firebase'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useObjectVal, useObject } from 'react-firebase-hooks/database'
import useAuth from './useAuth'
import { Game } from './useGames'

const useGame = (gameId?: string): [game: Game, rent: () => void, renting: boolean, returnGame: () => void] => {
  const [_, user] = useAuth()
  const userRef = useRef(null)
  const gameRef = useRef(null)
  const [game, loading, error] = useObjectVal<Game>(firebase.database().ref('games/' + gameId))
  const [renting, setRenting] = useState(false)

  useEffect(() => {
    gameRef.current = firebase.database().ref('games/' + gameId)
    if (user) {
      userRef.current = firebase.database().ref('users/' + user.uid)
    }
  }, [user])

  const rentGame = useCallback(() => {
    if (game && !renting && user) {
      setRenting(true)
      gameRef.current.update(
        {
          rented: true,
          rentedBy: user.uid,
        },
        (rentError) => {
          setRenting(false)
        }
      )

      userRef.current.once('value').then((value) => {
        const userVal = value.val() as {
          renting: string[]
        }
        if (userVal) {
          return userRef.current.update({
            ...userVal,
            renting: [...userVal.renting, gameId],
          })
        }
        return userRef.current.set({
          renting: [gameId],
        })
      })
    }
  }, [game, user, renting, gameRef, userRef, gameId])

  const giveBackGame = useCallback(() => {
    if (game && !renting) {
      setRenting(true)
      gameRef.current.update(
        {
          rented: false,
          rentedBy: null,
        },
        (rentError) => {
          setRenting(false)
        }
      )

      userRef.current.once('value').then((value) => {
        const userVal = value.val() as {
          renting: string[]
        }
        if (userVal) {
          return userRef.current.update({
            ...userVal,
            renting: userVal.renting.filter((id) => id !== gameId),
          })
        }
      })
    }
  }, [game, renting, gameRef, userRef, gameId])

  return [gameId && game, rentGame, renting, giveBackGame]
}

export default useGame
