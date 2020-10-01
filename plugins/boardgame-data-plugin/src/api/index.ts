import axios from 'axios'
import { BoardgameDetails, Images } from '../types'
const BASE_URL = 'https://api.geekdo.com/api'

const GET_GAME_URL = `${BASE_URL}/geekitems?noSession=1&objecttype=thing&subtype=boardgame`
const GET_IMAGE_URL = `${BASE_URL}/images/`

type BoardgameResponse = {
  item: BoardgameDetails
}

interface ImageResponse {
  type: string
  images: Images
}

export const getGameDetails = (objectId: number) =>
  axios
    .get<BoardgameResponse>(`${GET_GAME_URL}&objectid=${objectId}`)
    .then((response) => response.data.item)
    .then(({ imageid, ...game }) => {
      return axios.get<ImageResponse>(`${GET_IMAGE_URL}${imageid}`).then((response) => ({
        ...game,
        images: response.data.images,
      }))
    })
