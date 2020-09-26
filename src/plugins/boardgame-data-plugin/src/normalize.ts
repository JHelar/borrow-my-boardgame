import { NodePluginArgs } from 'gatsby'
import { Boardgame, BoardgameDesigner } from './types'

const isBoardgameDesigner = (entity: Boardgame | BoardgameDesigner): entity is BoardgameDesigner => entity.objecttype !== 'things'

export interface NormalizedDesigner extends Pick<BoardgameDesigner, 'name' | 'objectid'> {
    id: string
    __type: 'Designer'
    boardgame__NODE: string[]
}

type DesignerNodes = {
    boardgamedesigner__NODE: string[];
    boardgameartist__NODE: string[];
    boardgamepublisher__NODE: string[];
    boardgamehonor__NODE: string[];
    boardgamecategory__NODE: string[];
    boardgamemechanic__NODE: string[];
    boardgameexpansion__NODE: string[];
    boardgameversion__NODE: string[];
    boardgameintegration__NODE: string[];
    boardgamefamily__NODE: string[];
    videogamebg__NODE: string[];
    boardgamesubdomain__NODE: string[];
    boardgameaccessory__NODE: string[];
} 

export interface NormalizedBoardgame extends Omit<Boardgame, 'wiki' | 'bggstore_product' | 'linkcounts' | 'walmart_id' | 'targetco_url' | 'href' | 'objectid' | 'objecttype' | 'itemid'> {
    id: string
    __type: 'Boardgame'
    designers: DesignerNodes
}

type NormalizeEntity = <TEntity extends BoardgameDesigner | Boardgame>(entity: TEntity, nodePlugin: Pick<NodePluginArgs, 'createNodeId'>) => TEntity extends BoardgameDesigner ? NormalizedDesigner : NormalizedBoardgame
export const normalizeEntity: NormalizeEntity = (entity, { createNodeId }) => {
	if (isBoardgameDesigner(entity)) {
		const normalized: NormalizedDesigner = {
			id: createNodeId('Designer'),
			__type: 'Designer',
			objectid: entity.objectid,
			name: entity.name,
			boardgame__NODE: []
		}
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return normalized as any
	}
	const boardgame = entity as Boardgame
	const normalized: NormalizedBoardgame = {
		...boardgame,
		__type: 'Boardgame',
		id: createNodeId('Boardgame'),
		designers: {
			boardgameaccessory__NODE: [],
			boardgameartist__NODE: [],
			boardgamecategory__NODE: [],
			boardgamedesigner__NODE: [],
			boardgameexpansion__NODE: [],
			boardgamefamily__NODE: [],
			boardgamehonor__NODE: [],
			boardgameintegration__NODE: [],
			boardgamemechanic__NODE: [],
			boardgamepublisher__NODE: [],
			boardgamesubdomain__NODE: [],
			boardgameversion__NODE: [],
			videogamebg__NODE: []
		}
	}
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return normalized as any
}

export const linkBoardgamesAndDesigners = (games: NormalizedBoardgame[], designers: NormalizedDesigner[]): [NormalizedBoardgame[], NormalizedDesigner[]] => {
	games.forEach(game => {
		game.designers = Object.entries(game.links).reduce((acc, [key, value]) => {
			return {
				...acc,
				[`${key}__NODE`]: value.map((d: BoardgameDesigner) => designers.find(n => n.objectid === d.objectid)?.id).filter(Boolean) as string[]
			}
		}, {} as DesignerNodes)
	})
    
	designers.forEach(designer => {
		const involvedGames = games.filter(game => Object.values(game.designers).some(gameDesigners => gameDesigners.some(d => d === designer.id)))
		if(involvedGames.length) {
			designer.boardgame__NODE = involvedGames.map(({ id }) => id)
		}
	})
    
	return [
		games,
		designers
	]
}