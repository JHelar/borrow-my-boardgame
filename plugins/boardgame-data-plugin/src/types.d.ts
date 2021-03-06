export type ObjectOurType = 'game' | 'person' | 'publisher' | 'category' | 'mechanic'

export type ObjectSourceType = 'thing' | 'person' | 'company' | 'version' | 'property' | 'family'

export interface Boardgame extends BoardgameInfo, BoardgameDetails {}

export interface BoardgameInfo {
  objectId: number
  rank: number
}

export interface BoardgameDetails {
  itemid: number
  objecttype: ObjectSourceType
  objectid: number
  label: string
  labelpl: string
  type: string
  id: string
  href: string
  subtype: string
  subtypes: string[]
  versioninfo: Versioninfo
  name: string
  alternatename?: any
  yearpublished: string
  minplayers: string
  maxplayers: string
  minplaytime: string
  maxplaytime: string
  minage: string
  override_rankable: number
  targetco_url: string
  walmart_id: string
  instructional_videoid?: any
  summary_videoid: string
  playthrough_videoid?: any
  focus_videoid?: any
  bggstore_product: string
  short_description: string
  links: Links
  linkcounts: Linkcounts
  secondarynamescount: number
  alternatenamescount: number
  primaryname: Primaryname
  alternatenames: Alternatename[]
  description: string
  wiki: string
  website: Website
  imageid: string
  images: Images
  imagepagehref: string
  imageurl: string
  topimageurl: string
  imageSets: ImageSets
  itemstate: string
  promoted_ad?: any
  special_user?: any
}

export interface ImageSets {
  square100: Square100
}

export interface Square100 {
  src: string
  'src@2x': string
}

export interface Website {
  url: string
  title: string
}

export interface Alternatename {
  nameid: string
  name: string
}

export interface Primaryname {
  nameid: string
  name: string
  sortindex: string
  primaryname: string
  translit: string
}

export interface Linkcounts {
  boardgamedesigner: number
  boardgameartist: number
  boardgamepublisher: number
  boardgamehonor: number
  boardgamecategory: number
  boardgamemechanic: number
  boardgameexpansion: number
  boardgameversion: number
  expandsboardgame: number
  boardgameintegration: number
  contains: number
  containedin: number
  reimplementation: number
  reimplements: number
  boardgamefamily: number
  videogamebg: number
  boardgamesubdomain: number
  boardgameaccessory: number
  commerceweblink: number
}

export interface Links {
  boardgamedesigner: BoardgameDesigner[]
  boardgameartist: BoardgameDesigner[]
  boardgamepublisher: BoardgameDesigner[]
  boardgamehonor: BoardgameDesigner[]
  boardgamecategory: BoardgameDesigner[]
  boardgamemechanic: BoardgameDesigner[]
  boardgameexpansion: BoardgameDesigner[]
  boardgameversion: BoardgameDesigner[]
  boardgameintegration: BoardgameDesigner[]
  boardgamefamily: BoardgameDesigner[]
  videogamebg: BoardgameDesigner[]
  boardgamesubdomain: BoardgameDesigner[]
  boardgameaccessory: BoardgameDesigner[]
}

export interface BoardgameDesigner {
  name: string
  objecttype: ObjectSourceType
  objectid: string
  primarylink: number
  itemstate: string
  href: string
}

export interface Versioninfo {
  kickstarter_widget_url: string
  gamepageorderurl?: any
  shopifyitem?: any
}

export interface Images {
  micro: Micro
  small: Small
  medium: Small
  large: Large
  square: Small
  itempage: Micro
  imagepage: Micro
  imagepagezoom: Micro
  expanded: Micro
  crop100: Micro
  square200: Micro
  mediacard: Mediacard
  original: Large
}

interface Mediacard {
  url: string
  src: string
  'src@2x': string
}

interface Large {
  url: string
  src: string
  width: number
  height: number
}

interface Small {
  url: string
  src: string
  'src@2x': string
  width: number
  height: number
}

interface Micro {
  url: string
  src: string
}

interface Source {
  type: string
  id: string
}

interface Dimensions {
  width: number
  height: number
}
