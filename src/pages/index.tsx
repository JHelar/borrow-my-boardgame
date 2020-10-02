import React from 'react'
import Layout from 'src/layout'

import { graphql } from 'gatsby'
import TopGame from 'src/components/TopGame'
import GameShelf from 'src/components/GameShelf'
import styled from '@emotion/styled'
import { MAIN_BACKGROUND } from 'src/styles/colors'

type GameThumbnail = {
  id: string
  name: string
  short_description: string
  fields: {
    slug: string
  }
  images: {
    medium: {
      src: string
    }
  }
}

type GameShelfData = {
  edges: Array<{ node: GameThumbnail }>
}

type HomePageData = {
  topGames: GameShelfData
  adventureGames: GameShelfData
  cooperativeGames: GameShelfData
}
//height: 56.25vw;
const GameShelfs = styled.div`
  margin-top: ${-56.25 / 4}vw;
  position: relative;
  background-image: linear-gradient(to top, ${MAIN_BACKGROUND} 60%, transparent);
`

const HomePage: GatsbyPage<HomePageData> = ({ data: { topGames, adventureGames, cooperativeGames } }) => (
  <Layout title="Home">
    <TopGame />
    <GameShelfs>
      <GameShelf games={topGames.edges.map((edge) => edge.node)} title="Top boardgames" />
      <GameShelf games={adventureGames.edges.map((edge) => edge.node)} title="Top Adventure games" />
      <GameShelf games={cooperativeGames.edges.map((edge) => edge.node)} title="Top Co-op games" />
    </GameShelfs>
  </Layout>
)

export const query = graphql`
  query {
    topGames: allBoardgame(limit: 10, sort: { fields: rank, order: ASC }, skip: 1) {
      edges {
        node {
          id
          name
          short_description
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
    adventureGames: allBoardgame(
      filter: { info: { category: { elemMatch: { name: { eq: "Adventure" } } } } }
      sort: { fields: rank, order: ASC }
      limit: 10
    ) {
      edges {
        node {
          name
          id
          short_description
          images {
            medium {
              src
            }
          }
          fields {
            slug
          }
        }
      }
    }
    cooperativeGames: allBoardgame(
      filter: { info: { mechanic: { elemMatch: { name: { eq: "Cooperative Game" } } } } }
      sort: { fields: rank, order: ASC }
      limit: 10
    ) {
      edges {
        node {
          name
          id
          short_description
          images {
            medium {
              src
            }
          }
          fields {
            slug
          }
        }
      }
    }
  }
`

export default HomePage
