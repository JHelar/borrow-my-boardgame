import firebase from 'gatsby-plugin-firebase'
import { useObjectVal } from 'react-firebase-hooks/database'

export type Game = {
  rented: boolean
  rentedBy: string
}

type Games = Record<string, Game>

const useGames = () => {
  const [games, loading, error] = useObjectVal<Games>(firebase.database().ref('games'))
  return games
}

export default useGames
