import React from 'react'
import { graphql, navigate } from 'gatsby'
import Layout from 'src/layout'
import BoardgameModal, { BoardgameData } from 'src/components/BoardgameModal'

const Boardgame = (props: BoardgameData) => {
  return (
    <Layout title={`${props.data.boardgame.name}`}>
      <BoardgameModal {...props} onClose={() => navigate('/')} />
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    boardgame(fields: { slug: { eq: $slug } }) {
      id
      name
      description
      minage
      minplayers
      maxplayers
      minplaytime
      maxplaytime
      yearpublished
      rank
      images {
        large {
          src
        }
      }
      info {
        designer {
          name
          id
          fields {
            slug
          }
        }
        category {
          id
          name
          fields {
            slug
          }
        }
        mechanic {
          id
          name
          fields {
            slug
          }
        }
        publisher {
          id
          name
          fields {
            slug
          }
        }
      }
    }
  }
`

export default Boardgame
