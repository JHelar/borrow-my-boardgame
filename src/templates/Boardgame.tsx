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
    }
  }
}

const Boardgame = ({ data }: BoardgameData) => {
  const { name, description, images } = data.boardgame
  return (
    <Layout title={`BmB - ${name}`}>
      <div>
        <img src={images.previewthumb} alt="" />
        <h1>{name}</h1>
        <div dangerouslySetInnerHTML={{ __html: description }}></div>
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
    }
  }
`

export default Boardgame
