import type { GatsbyNode, NodeInput } from 'gatsby'
import { snakeCase } from 'snake-case'

const getSlugFromNodeContentName = (node: NodeInput['internal']): string => {
  const boardGame = JSON.parse(node.content) as { name: string }
  return `/${node.type}/${snakeCase(boardGame.name)}`
}

const onCreateNode: GatsbyNode['onCreateNode'] = ({ node, actions: { createNodeField } }) => {
  // https://www.gatsbyjs.org/docs/node-apis/#onCreatePage
  if (node.internal.type === 'boardgame' || node.internal.type === 'category' || node.internal.type === 'person') {
    const slug = getSlugFromNodeContentName(node.internal)
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    })
  }
}

export default onCreateNode
