import fs from 'fs'
import path from 'path'
import { Boardgame } from './types'

export const getGamesFromSaveFile = (pageNo: number): Promise<Boardgame[] | null> =>
  new Promise((resolve) => {
    fs.readFile(path.resolve(`bdp-saves/games-${pageNo}.json`), (err, data) => {
      if (err) {
        resolve(null)
      } else {
        resolve(JSON.parse(data.toString()) as Boardgame[])
      }
    })
  })

export const saveGamesToSaveFile = (pageNo: number, games: Boardgame[]) =>
  new Promise((resolve) => {
    fs.writeFile(path.resolve(`bdp-saves/games-${pageNo}.json`), JSON.stringify(games), (saveGamesToSaveFileError) => {
      if (saveGamesToSaveFileError) {
        console.log({
          saveGamesToSaveFileError,
        })
      }
      resolve()
    })
  })
