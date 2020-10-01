import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from 'src/layout'

type QueryData = {
  data: {
    person: {
      name: string
      boardgame: {
        id: string
        name: string
        fields: {
          slug: string
        }
        images: {
          small: {
            src: string
          }
        }
        short_description: string
      }[]
    }
  }
}

const Category = ({ data }: QueryData) => {
  const { name, boardgame } = data.person
  return (
    <Layout title={`BmB - ${name}`}>
      <div>
        <h1>
          Games made by <b>{name}</b>:
        </h1>
        <ul>
          {boardgame.map((game) => (
            <li key={game.id}>
              <Link to={game.fields.slug}>
                <img src={game.images.small.src} alt={game.name} />
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
    person(fields: { slug: { eq: $slug } }) {
      name
      boardgame {
        id
        name
        fields {
          slug
        }
        images {
          small {
            src
          }
        }
        short_description
      }
    }
  }
`

export default Category
