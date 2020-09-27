/* eslint-disable max-len */
import puppeteer from 'puppeteer'
import { BoardgameInfo } from '../types'
const url = 'https://boardgamegeek.com/browse/boardgame'

export const getBoardGameLinks = async (): Promise<BoardgameInfo[]> => {
  let boardGameLinks: Array<BoardgameInfo> = []
  const browser = await puppeteer.launch({
    args: [
      '--disable-gpu',
      '--renderer',
      '--no-sandbox',
      '--no-service-autorun',
      '--no-experiments',
      '--no-default-browser-check',
      '--disable-dev-shm-usage',
      '--disable-setuid-sandbox',
      '--no-first-run',
      '--no-zygote',
      '--single-process',
      '--disable-extensions',
    ],
  })
  console.log('Browser open')
  try {
    const page = await browser.newPage()
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.129 Safari/537.36'
    )
    await page.goto(url)
    await page.waitForSelector('.ulprice').catch((err) => {
      console.log(err)
    })
    boardGameLinks =
      (await page.evaluate(() => {
        const wrapSelector = <T>(selector: string, doWork: (s: string) => T | null) => {
          try {
            return doWork(selector)
          } catch (error) {
            console.error(`Error while selecting: ${selector}`)
            console.error(error)
            return null
          }
        }

        return wrapSelector('#collectionitems > tbody > tr', (selector) => {
          const [, ...games] = Array.from(document.querySelectorAll(selector))
          //const testGames = [games[0]] // For test only take 1
          return games.map<BoardgameInfo>((game) => {
            const rank = parseInt(game.querySelector('.collection_rank > a').getAttribute('name'))
            const gameDetails = game.querySelector('.collection_objectname')
            const objectId = parseInt(
              gameDetails
                .querySelector('.primary')
                .getAttribute('href')
                .match(/\/([0-9]*)\//)[1]
            )

            return {
              objectId,
              rank,
            }
          })
        })
      })) || []
  } catch (error) {
    console.log(error)
  } finally {
    await browser.close()
    console.log('Browser Closed')
  }
  return boardGameLinks
}
