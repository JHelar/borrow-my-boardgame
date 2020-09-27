import axios from 'axios'
import { BoardgameDetails } from '../types'
const BASE_URL = 'https://api.geekdo.com/api'

const GET_GAME_URL = `${BASE_URL}/geekitems?noSession=1&objecttype=thing&subtype=boardgame`

type BoardgameResponse = {
  item: BoardgameDetails
}

export const getGameDetails = (objectId: number) =>
  axios.get<BoardgameResponse>(`${GET_GAME_URL}&objectid=${objectId}`).then((response) => response.data.item)
