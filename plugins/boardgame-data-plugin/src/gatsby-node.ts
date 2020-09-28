import { GatsbyNode, SourceNodesArgs } from 'gatsby'
import { getGameDetails } from './api'
import { linkBoardgamesAndDesigners, normalizeBoardgameEntity, normalizeDesignerEntity } from './normalize'
import { getGamesFromSaveFile, saveGamesToSaveFile } from './saveGames'
import { getBoardGameLinks } from './scraper'
import { Boardgame, BoardgameDesigner, BoardgameInfo } from './types'

const getBoardgame = async (info: BoardgameInfo) => {
  const gameDetails = await getGameDetails(info.objectId).catch((getGameDetailsError) => {
    console.error({
      getGameDetailsError,
    })
    return null
  })
  return {
    ...gameDetails,
    ...info,
  } as Boardgame
}

const getBoardgames = async () => {
  let allLinks: Boardgame[] = []
  const boardgameLinks = getBoardGameLinks()
  for await (const { links, pageNo, saveExists } of boardgameLinks) {
    let games: Boardgame[] = []
    if (saveExists) {
      games = await getGamesFromSaveFile(pageNo)
    } else {
      games = (await Promise.all(links.map(async (info) => getBoardgame(info)))).filter(Boolean) as Boardgame[]
      await saveGamesToSaveFile(pageNo, games)
    }
    allLinks = [...allLinks, ...games]
  }

  return allLinks
}

const parseDesigners = (gameboards: Boardgame[]) => {
  const designerSet = new Set<BoardgameDesigner>()
  gameboards.forEach(({ links }) => {
    Object.values(links).forEach((designers: BoardgameDesigner[]) =>
      designers.forEach((designer) => {
        designerSet.add(designer)
      })
    )
  })
  return [...designerSet]
}

export const sourceNodes: GatsbyNode['sourceNodes'] = async (args: SourceNodesArgs) => {
  const {
    actions: { createNode },
    createContentDigest,
  } = args

  const boardgames = await getBoardgames()
  const designers = parseDesigners(boardgames)

  const normalizedGames = boardgames.map((game) => normalizeBoardgameEntity(game, args))
  const normalizedDesigners = designers.map((designer) => normalizeDesignerEntity(designer, args))

  const [linkedBoardgames, linkedDesigners] = linkBoardgamesAndDesigners(normalizedGames, normalizedDesigners)
  const entities = [...linkedBoardgames, ...linkedDesigners]

  entities.forEach((entity) => {
    const contentJSON = JSON.stringify(entity)
    const node = {
      ...entity,
      internal: {
        type: entity.__type,
        content: contentJSON,
        contentDigest: createContentDigest(contentJSON),
      },
    }
    createNode(node)
  })
}
