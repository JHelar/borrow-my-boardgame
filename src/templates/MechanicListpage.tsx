import React from 'react'
import { graphql } from 'gatsby'
import Layout from 'src/layout'
import Listpage, { ListpageData } from 'src/components/Listpage'

type QueryData = {
  data: {
    mechanic: ListpageData
  }
}

const Mechanic = ({ data, ...props }: QueryData) => {
  const { name } = data.mechanic
  console.log(data, props)
  return (
    <Layout title={`${name} games`} noHome>
      <Listpage {...data.mechanic} />
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    mechanic(fields: { slug: { eq: $slug } }) {
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

export default Mechanic
