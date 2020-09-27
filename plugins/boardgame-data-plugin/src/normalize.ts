import { NodePluginArgs } from 'gatsby'
import { Boardgame, BoardgameDesigner, ObjectType } from './types'

export interface NormalizedDesigner extends Pick<BoardgameDesigner, 'name' | 'objectid'> {
    id: string
    __type: ObjectType
    boardgame___NODE: string[]
}

type DesignerNodes = {
    designer___NODE: string[];
    artist___NODE: string[];
    publisher___NODE: string[];
    honor___NODE: string[];
    category___NODE: string[];
    mechanic___NODE: string[];
    expansion___NODE: string[];
    version___NODE: string[];
    integration___NODE: string[];
    family___NODE: string[];
    videogamebg___NODE: string[];
    subdomain___NODE: string[];
    accessory___NODE: string[];
} 

export interface NormalizedBoardgame extends Omit<Boardgame, 'wiki' | 'bggstore_product' | 'linkcounts' | 'walmart_id' | 'targetco_url' | 'href' | 'objectid' | 'objecttype' | 'itemid'> {
    id: string
    __type: 'boardgame'
    info: DesignerNodes
}

type NormalizeEntity<TEntity extends BoardgameDesigner | Boardgame> = (entity: TEntity, nodePlugin: Pick<NodePluginArgs, 'createNodeId'>) => TEntity extends BoardgameDesigner ? NormalizedDesigner : NormalizedBoardgame
export const normalizeDesignerEntity: NormalizeEntity<BoardgameDesigner> = (entity, { createNodeId }) => {
	const normalized: NormalizedDesigner = {
		id: createNodeId(`${entity.objectid}-${entity.objecttype}`),
		__type: entity.objecttype,
		objectid: entity.objectid,
		name: entity.name,
		boardgame___NODE: []
	}
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return normalized as any
}

export const normalizeBoardgameEntity: NormalizeEntity<Boardgame> = (entity, { createNodeId }) => {
	const boardgame = entity as Boardgame
	const normalized: NormalizedBoardgame = {
		...boardgame,
		__type: 'boardgame',
		id: createNodeId(`${entity.objectid}-boardgame`),
		info: {
			accessory___NODE: [],
			artist___NODE: [],
			category___NODE: [],
			designer___NODE: [],
			expansion___NODE: [],
			family___NODE: [],
			honor___NODE: [],
			integration___NODE: [],
			mechanic___NODE: [],
			publisher___NODE: [],
			subdomain___NODE: [],
			version___NODE: [],
			videogamebg___NODE: []
		}
	}
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return normalized as any
}

export const linkBoardgamesAndDesigners = (games: NormalizedBoardgame[], designers: NormalizedDesigner[]): [NormalizedBoardgame[], NormalizedDesigner[]] => {
	games.forEach(game => {
		game.info = Object.entries(game.links).reduce((acc, [key, value]) => {
			return {
				...acc,
				[`${key.replace('boardgame', '')}___NODE`]: value.map((d: BoardgameDesigner) => designers.find(n => n.objectid === d.objectid)?.id).filter(Boolean) as string[]
			}
		}, {} as DesignerNodes)
	})
    
	designers.forEach(designer => {
		const involvedGames = games.filter(game => Object.values(game.info).some(gameDesigners => gameDesigners.some(d => d === designer.id)))
		if(involvedGames.length) {
			designer.boardgame___NODE = involvedGames.map(({ id }) => id)
		}
	})
    
	return [
		games,
		designers
	]
}