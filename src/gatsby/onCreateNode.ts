import type { GatsbyNode, NodeInput } from 'gatsby'
import { snakeCase } from 'snake-case'

const getSlugFromNodeContentName = (node: NodeInput['internal']): string => {
  const boardGame = JSON.parse(node.content) as { name: string }
  return `/${node.type}/${snakeCase(boardGame.name)}`
}

const pageTypes = ['boardgame', 'category', 'person', 'mechanic', 'publisher']

const onCreateNode: GatsbyNode['onCreateNode'] = ({ node, actions: { createNodeField } }) => {
  // https://www.gatsbyjs.org/docs/node-apis/#onCreatePage
  if (pageTypes.includes(node.internal.type)) {
    const slug = getSlugFromNodeContentName(node.internal)
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    })
  }
}

export default onCreateNode
