import firebase from 'gatsby-plugin-firebase'
import { useObjectVal } from 'react-firebase-hooks/database'
import { Boardgame } from 'src/components/BoardgameModal'

export interface Game extends Boardgame {
  rented: boolean
  rentedBy: string
  fields: {
    slug: string
  }
}
type Games = Record<string, Boardgame>

const useGames = () => {
  const [games, loading, error] = useObjectVal<Games>(firebase.database().ref('games'))
  return games
}

export default useGames
