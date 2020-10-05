import path from 'path'
import { CreatePagesArgs, GatsbyNode } from 'gatsby'

type QueryResult = {
  edges: {
    node: {
      fields: {
        slug: string
      }
    }
  }[]
}

type BoardgameResult = {
  allBoardgame: QueryResult
}

type ListpageType = 'Person' | 'Category' | 'Mechanic' | 'Publisher'
type ListpageResult = {
  [k in string]: QueryResult
}

const createBoardgamePages = async ({ actions: { createPage }, graphql }: CreatePagesArgs) => {
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

const createListPageForType = async ({ actions: { createPage }, graphql }: CreatePagesArgs, type: ListpageType) => {
  const nodesName = `all${type}`
  const personResult = await graphql<ListpageResult>(`
    query {
      ${nodesName} {
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
  personResult.data[nodesName].edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/${type}Listpage.tsx`),
      context: {
        slug: node.fields.slug,
      },
    })
  })
}

const createPages: GatsbyNode['createPages'] = async (args) => {
  await createBoardgamePages(args)

  const listpages: Array<ListpageType> = ['Category', 'Mechanic', 'Person', 'Publisher']
  for (const listpageType of listpages) {
    await createListPageForType(args, listpageType)
  }
}

export default createPages
