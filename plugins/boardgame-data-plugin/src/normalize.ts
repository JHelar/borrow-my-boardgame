import { NodePluginArgs } from 'gatsby'
import { Boardgame, BoardgameDesigner, Links, ObjectOurType, ObjectSourceType } from './types'

export interface NormalizedDesigner extends Pick<BoardgameDesigner, 'name' | 'objectid' | 'objecttype'> {
  id: string
  __type: ObjectSourceType
  boardgame___NODE: string[]
}

type DesignerNodes = {
  designer___NODE: string[]
  artist___NODE: string[]
  publisher___NODE: string[]
  honor___NODE: string[]
  category___NODE: string[]
  mechanic___NODE: string[]
  expansion___NODE: string[]
  version___NODE: string[]
  integration___NODE: string[]
  family___NODE: string[]
  videogamebg___NODE: string[]
  subdomain___NODE: string[]
  accessory___NODE: string[]
}

export interface NormalizedBoardgame
  extends Omit<
    Boardgame,
    | 'wiki'
    | 'bggstore_product'
    | 'linkcounts'
    | 'walmart_id'
    | 'targetco_url'
    | 'href'
    | 'objectid'
    | 'objecttype'
    | 'itemid'
  > {
  id: string
  __type: 'boardgame'
  info: DesignerNodes
}

type NormalizeEntity<TEntity extends BoardgameDesigner | Boardgame> = (
  entity: TEntity,
  nodePlugin: Pick<NodePluginArgs, 'createNodeId'>
) => TEntity extends BoardgameDesigner ? NormalizedDesigner : NormalizedBoardgame
export const normalizeDesignerEntity: NormalizeEntity<BoardgameDesigner> = (entity, { createNodeId }) => {
  const normalized: NormalizedDesigner = {
    id: createNodeId(`${entity.objectid}-${entity.objecttype}`),
    __type: entity.objecttype,
    objectid: entity.objectid,
    objecttype: entity.objecttype,
    name: entity.name,
    boardgame___NODE: [],
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
      videogamebg___NODE: [],
    },
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return normalized as any
}

const findDeisgnersAndAssignGame = (designers: NormalizedDesigner[]) => (
  game: NormalizedBoardgame,
  link: keyof Links,
  type: ObjectSourceType,
  mapDesignerType: ObjectOurType,
  asGamesReferences?: NormalizedBoardgame[]
) => {
  const gameDesigners = designers.filter((designer) => {
    const isDesigner =
      designer.objecttype === type &&
      game.links[link].some((boardgameDesigner) => boardgameDesigner.objectid === designer.objectid)
    if (isDesigner) {
      Object.assign(designer, {
        boardgame___NODE: [...designer.boardgame___NODE, game.id],
        __type: mapDesignerType,
      })
    }
    return isDesigner
  })

  if (asGamesReferences) {
    return asGamesReferences
      .filter((gameReference) => gameDesigners.some((gd) => gd.objectid === gameReference.objectId.toString()))
      .map(({ id }) => id)
  }
  return gameDesigners.map(({ id }) => id)
}

export const linkBoardgamesAndDesigners = (
  games: NormalizedBoardgame[],
  designers: NormalizedDesigner[]
): [NormalizedBoardgame[], NormalizedDesigner[]] => {
  const designerFinder = findDeisgnersAndAssignGame(designers)
  games.forEach((game) => {
    const gameDesigners = designerFinder(game, 'boardgamedesigner', 'person', 'person')
    const gameCategories = designerFinder(game, 'boardgamecategory', 'property', 'category')
    const gameArtists = designerFinder(game, 'boardgameartist', 'person', 'person')
    const gameExpansions = designerFinder(game, 'boardgameexpansion', 'thing', 'game', games)
    const gameMechanics = designerFinder(game, 'boardgamemechanic', 'property', 'mechanic')
    const gamePublishers = designerFinder(game, 'boardgamepublisher', 'company', 'publisher')

    const info = {
      designer___NODE: gameDesigners,
      category___NODE: gameCategories,
      artist___NODE: gameArtists,
      expansion___NODE: gameExpansions,
      mechanic___NODE: gameMechanics,
      publisher___NODE: gamePublishers,
    } as DesignerNodes

    Object.assign(game, {
      info,
    })
  })

  return [games, designers]
}
