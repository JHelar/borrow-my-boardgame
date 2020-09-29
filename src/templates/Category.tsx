import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from 'src/layout'

type QueryData = {
  data: {
    category: {
      name: string
      boardgame: {
        id: string
        name: string
        fields: {
          slug: string
        }
        images: {
          thumb: string
        }
        short_description: string
      }[]
    }
  }
}

const Category = ({ data }: QueryData) => {
  const { name, boardgame } = data.category
  return (
    <Layout title={`BmB - Category ${name}`}>
      <div>
        <h1>
          Games in category <b>{name}</b>:
        </h1>
        <ul>
          {boardgame.map((game) => (
            <li key={game.id}>
              <Link to={game.fields.slug}>
                <img src={game.images.thumb} alt={game.name} />
                <h3>{game.name}</h3>
                <p>{game.short_description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
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
          thumb
        }
        short_description
      }
    }
  }
`

export default Category
