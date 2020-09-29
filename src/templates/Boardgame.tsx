import React from 'react'
import { graphql, Link } from 'gatsby'
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
        designer: { name: string; id: string; fields: { slug: string } }[]
        category: { name: string; id: string; fields: { slug: string } }[]
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
        <ul>
          {designer &&
            designer.map((d) => (
              <li key={d.id}>
                <Link to={d.fields.slug}>{d.name}</Link>
              </li>
            ))}
        </ul>
        <h2>Categories</h2>
        <ul>
          {category &&
            category.map((c) => (
              <li key={c.id}>
                <Link to={c.fields.slug}>{c.name}</Link>
              </li>
            ))}
        </ul>
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
      }
    }
  }
`

export default Boardgame
