import React from 'react'
import { graphql } from 'gatsby'
import Layout from 'src/layout'
import Listpage, { ListpageData } from 'src/components/Listpage'

type QueryData = {
  data: {
    publisher: ListpageData
  }
}

const Publisher = ({ data }: QueryData) => {
  const { name } = data.publisher
  return (
    <Layout title={`${name}`} noHome>
      <Listpage {...data.publisher} />
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    publisher(fields: { slug: { eq: $slug } }) {
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

export default Publisher
