import { GatsbyCache, GatsbyNode, SourceNodesArgs } from 'gatsby'
import { getGameDetails } from './api'
import { linkBoardgamesAndDesigners, normalizeBoardgameEntity, normalizeDesignerEntity } from './normalize'
import { getBoardGameLinks } from './scraper'
import { Boardgame, BoardgameDesigner, BoardgameInfo } from './types'

const getBoardgame = async (info: BoardgameInfo, cache: GatsbyCache) => {
	const cachedDetails = await cache.get(`${info.objectId}`)
	if (cachedDetails) {
		return {
			...info,
			...cachedDetails
		} as Boardgame
	}
	const gameDetails = await getGameDetails(info.objectId)
		.catch((getGameDetailsError) => {
			console.error({
				getGameDetailsError
			})
			return null
		})
	await cache.set(`${info.objectId}`, gameDetails)
	return {
		...gameDetails,
		...info
	} as Boardgame
}

const getBoardgames = async (cache: GatsbyCache) => {
	const gameBoardLinks = await getBoardGameLinks()
	const games = (await Promise.all(gameBoardLinks.map(async (info) => getBoardgame(info, cache)))).filter(Boolean) as Boardgame[]

	return games
}

const parseDesigners = (gameboards: Boardgame[]) => {
	const designerSet = new Set<BoardgameDesigner>()
	gameboards.forEach(({ links }) => {
		Object.values(links)
			.forEach((designers: BoardgameDesigner[]) => designers.forEach(designer => {
				designerSet.add(designer)
			}))
	})
	return [...designerSet]
}

export const sourceNodes: GatsbyNode['sourceNodes'] = async (args: SourceNodesArgs) => {
	const { actions: { createNode }, createContentDigest, cache } = args

	const boardgames = await getBoardgames(cache)
	const designers = parseDesigners(boardgames)

	const normalizedGames = boardgames.map((game) => normalizeBoardgameEntity(game, args))
	const normalizedDesigners = designers.map((designer) => normalizeDesignerEntity(designer, args))

	const [linkedBoardgames, linkedDesigners] = linkBoardgamesAndDesigners(normalizedGames, normalizedDesigners)
	const entities = [...linkedBoardgames, ...linkedDesigners]

	entities.forEach(entity => {
		const node = {
			...entity,
			internal: {
				type: entity.__type,
				contentDigest: createContentDigest(JSON.stringify(entity))
			}
		}
		createNode(node)
	})
}