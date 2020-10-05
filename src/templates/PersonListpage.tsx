import React from 'react'
import { graphql } from 'gatsby'
import Layout from 'src/layout'
import Listpage, { ListpageData } from 'src/components/Listpage'

type QueryData = {
  data: {
    person: ListpageData
  }
}

const Person = ({ data }: QueryData) => {
  const { name } = data.person
  console.log(data.person.boardgame)
  return (
    <Layout title={`${name}`} noHome>
      <Listpage {...data.person} />
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    person(fields: { slug: { eq: $slug } }) {
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

export default Person
