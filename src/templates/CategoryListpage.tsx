import React from 'react'
import { graphql } from 'gatsby'
import Layout from 'src/layout'
import Listpage, { ListpageData } from 'src/components/Listpage'

type QueryData = {
  data: {
    category: ListpageData
  }
}

const Category = ({ data }: QueryData) => {
  const { name } = data.category
  return (
    <Layout title={`Category ${name}`} noHome>
      <Listpage {...data.category} />
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    category(fields: { slug: { eq: $slug } }) {
      name
      boardgame {
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
        short_description
      }
    }
  }
`

export default Category
