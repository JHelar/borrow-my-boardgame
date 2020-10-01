import React from 'react'
import Layout from 'src/layout'

import { graphql } from 'gatsby'
import TopGame from 'src/components/TopGame'

type GameThumbnail = {
  id: string
  name: string
  fields: {
    slug: string
  }
  images: {
    thumb: string
  }
}

type HomePageData = {
  topGames: {
    edges: Array<{ node: GameThumbnail }>
  }
}

const HomePage: GatsbyPage<HomePageData> = () => (
  <Layout title="Home">
    <TopGame />
  </Layout>
)

export const query = graphql`
  query {
    topGames: allBoardgame(limit: 10, sort: { fields: rank, order: ASC }, skip: 1) {
      edges {
        node {
          id
          name
          fields {
            slug
          }
          images {
            medium {
              src
            }
          }
        }
      }
    }
  }
`

export default HomePage
