import path from 'path'
import { GatsbyNode } from 'gatsby'

type BoardgameResult = {
  allBoardgame: {
    edges: {
      node: {
        fields: {
          slug: string
        }
      }
    }[]
  }
}

const createPages: GatsbyNode['createPages'] = async (args) => {
  const {
    actions: { createPage },
    graphql,
  } = args
  const boardgameResult = await graphql<BoardgameResult>(`
    query {
      allBoardgame {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  boardgameResult.data.allBoardgame.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/Boardgame.tsx`),
      context: {
        slug: node.fields.slug,
      },
    })
  })
}

export default createPages
