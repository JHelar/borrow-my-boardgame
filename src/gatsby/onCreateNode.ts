import type { GatsbyNode, NodeInput } from "gatsby"
import { snakeCase } from 'snake-case'

const getBoardgameSlug = (node: NodeInput["internal"]): string => {
  const boardGame = JSON.parse(node.contentDigest) as { name: string }
  return snakeCase(boardGame.name)
}

const onCreateNode: GatsbyNode["onCreateNode"] = ({ node, actions: { createNodeField } }) => {
  // https://www.gatsbyjs.org/docs/node-apis/#onCreatePage
  if(node.internal.type === 'boardgame') {
    const slug = getBoardgameSlug(node.internal)
    console.log(`Created slug: ${slug}`)
    createNodeField({
      node,
      name: 'slug',
      value: slug
    })
  }
}

export default onCreateNode