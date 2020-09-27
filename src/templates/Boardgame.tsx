import React from 'react'
import { graphql } from 'gatsby'
import Layout from 'src/layout'

type BoardgameData = {
  data: {
    boardgame: {
      name: string
      description: string
      images: {
        previewthumb: string
      }
      info: {
        designer: { name: string; id: string }[]
        category: { name: string; id: string }[]
      }
    }
  }
}

const Boardgame = ({ data }: BoardgameData) => {
  const {
    name,
    description,
    images,
    info: { designer, category },
  } = data.boardgame
  return (
    <Layout title={`BmB - ${name}`}>
      <div>
        <img src={images.previewthumb} alt="" />
        <h1>{name}</h1>
        <div dangerouslySetInnerHTML={{ __html: description }}></div>
        <h2>Designer(s)</h2>
        <ul>{designer && designer.map((d) => <li key={d.id}>{d.name}</li>)}</ul>
        <h2>Categories</h2>
        <ul>{category && category.map((c) => <li key={c.id}>{c.name}</li>)}</ul>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    boardgame(fields: { slug: { eq: $slug } }) {
      name
      description
      images {
        previewthumb
      }
      info {
        designer {
          ... on person {
            name
            id
          }
        }
        category {
          ... on property {
            name
            id
          }
        }
      }
    }
  }
`

export default Boardgame
