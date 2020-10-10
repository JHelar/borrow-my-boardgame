import path from 'path'
import { CreatePagesArgs, GatsbyNode } from 'gatsby'
import firebase from 'firebase'
import 'firebase/database'
import { Boardgame } from 'src/components/BoardgameModal'

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
  allBoardgame: {
    edges: {
      node: {
        fields: {
          slug: string
        }
      } & Boardgame
    }[]
  }
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
              medium {
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
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  if (true) {
    const firebaseData = boardgameResult.data.allBoardgame.edges.reduce(
      (acc, { node }) => ({ ...acc, [node.id]: { ...node } }),
      {}
    )
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { appCreds, writerCreds } = require(path.resolve(__dirname, '../../.firebase-creds'))
    firebase.initializeApp(appCreds)
    try {
      await firebase.auth().signInWithEmailAndPassword(writerCreds.username, writerCreds.password)
      const gamesRef = firebase.database().ref('games')
      await gamesRef.set(JSON.parse(JSON.stringify(firebaseData)))
      console.log('Wrote games to firebase')
    } catch (firebaseError) {
      console.log({ firebaseError })
    }
  }
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
