import fs from 'fs'
import path from 'path'
import { Boardgame } from './types'

const getFilepath = (pageNo: number) => path.resolve(`bdp-saves/games-${pageNo}.json`)

export const getGamesFromSaveFile = (pageNo: number): Promise<Boardgame[] | null> =>
  new Promise((resolve) => {
    fs.readFile(path.resolve(getFilepath(pageNo)), (err, data) => {
      if (err) {
        resolve(null)
      } else {
        resolve(JSON.parse(data.toString()) as Boardgame[])
      }
    })
  })

export const saveGamesToSaveFile = (pageNo: number, games: Boardgame[]) =>
  new Promise((resolve) => {
    fs.writeFile(getFilepath(pageNo), JSON.stringify(games), (saveGamesToSaveFileError) => {
      if (saveGamesToSaveFileError) {
        console.log({
          saveGamesToSaveFileError,
        })
      }
      resolve()
    })
  })

export const saveGamesExists = (pageNo: number) => fs.existsSync(getFilepath(pageNo))
