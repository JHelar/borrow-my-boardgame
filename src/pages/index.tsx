import React from "react"
import { Link } from "gatsby"

import Layout from "src/layout"
import Image from "src/components/Image"

import { graphql } from "gatsby"

type GameThumbnail = {
  id: string
  name: string
  images: {
    thumb: string
  }
}
type HomePageData = {
  allBoardgame: {
    nodes: GameThumbnail[]
  }
}

const GameThumbnail = (game: GameThumbnail) => (
  <div><img src={game.images.thumb} alt="" />{game.name}</div>
)

const HomePage: GatsbyPage<HomePageData> = ({ data }) => (
  <Layout title="Home">
    <h1>Wellcome to BmB</h1>
    <h2>Top ranking games</h2>
    <ul>
      {
        data.allBoardgame.nodes.map(game => <li key={game.id}><GameThumbnail {...game}/></li>)
      }
    </ul>
  </Layout>
)

export const query = graphql`
  query {
    allBoardgame(limit: 10, sort: {fields: rank, order: ASC}) {
      nodes {
        id
        name
        images {
          thumb
        }
      }
    }
  }
`

export default HomePage
