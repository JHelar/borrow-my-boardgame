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

type CategoryResult = {
  allCategory: QueryResult
}

type PersonResult = {
  allPerson: QueryResult
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

const createCategoryPages = async ({ actions: { createPage }, graphql }: CreatePagesArgs) => {
  const categoryResult = await graphql<CategoryResult>(`
    query {
      allCategory {
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
  categoryResult.data.allCategory.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/Category.tsx`),
      context: {
        slug: node.fields.slug,
      },
    })
  })
}

const createPersonPages = async ({ actions: { createPage }, graphql }: CreatePagesArgs) => {
  const personResult = await graphql<PersonResult>(`
    query {
      allPerson {
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
  personResult.data.allPerson.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/Person.tsx`),
      context: {
        slug: node.fields.slug,
      },
    })
  })
}

const createPages: GatsbyNode['createPages'] = async (args) => {
  await createBoardgamePages(args)
  await createCategoryPages(args)
  await createPersonPages(args)
}

export default createPages
