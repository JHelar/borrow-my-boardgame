import React from 'react'
import { Link } from 'gatsby'

import Layout from 'src/layout'

import { graphql } from 'gatsby'

type GameThumbnail = {
  node: {
    id: string
    name: string
    fields: {
      slug: string
    }
    images: {
      thumb: string
    }
  }
}
type HomePageData = {
  allBoardgame: {
    edges: GameThumbnail[]
  }
}

const GameThumbnail = ({ node: game }: GameThumbnail) => (
  <Link to={game.fields.slug}>
    <img src={game.images.thumb} alt="" />
    {game.name}
  </Link>
)

const HomePage: GatsbyPage<HomePageData> = ({ data }) => (
  <Layout title="Home">
    <h1>Wellcome to BmB</h1>
    <h2>Top ranking games</h2>
    <ul>
      {data.allBoardgame.edges.map((edge) => (
        <li key={edge.node.id}>
          <GameThumbnail {...edge} />
        </li>
      ))}
    </ul>
  </Layout>
)

export const query = graphql`
  query {
    allBoardgame(limit: 10, sort: { fields: rank, order: ASC }) {
      edges {
        node {
          id
          name
          fields {
            slug
          }
          images {
            thumb
          }
        }
      }
    }
  }
`

export default HomePage
