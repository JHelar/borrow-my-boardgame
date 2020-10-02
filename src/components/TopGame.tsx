import React from 'react'
import styled from '@emotion/styled'
import { graphql, useStaticQuery } from 'gatsby'

type TopGameData = {
  id: string
  name: string
  short_description: string
  fields: {
    slug: string
  }
  images: {
    large: {
      src: string
    }
  }
}

const TopGameWrapper = styled.div<TopGameData>`
  position: relative;
  width: 100%;
  height: 56.25vw;
  background-image: ${({
    images: {
      large: { src },
    },
  }) => `url("${src}")`};
  background-size: cover;
  background-position: center;
`

const TopGameShadow = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-image: linear-gradient(77deg, rgba(0, 0, 0, 0.6) 0, rgba(0, 0, 0, 0) 85%);
`

const TopGameContent = styled.div`
  position: relative;
  width: 36%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 4%;
  padding-top: ${56.25 / 4}vw;
`

const TopGameTitle = styled.h1`
  font-size: 4vw;
  font-weight: bold;
  color: white;
  margin: 0;
`

const TopGameDescription = styled.p`
  color: white;
  font-size: 1.5vw;
  margin: 0;
`

const TopGame: React.FC = () => {
  const data = useStaticQuery<{ topGame: TopGameData }>(graphql`
    query TopGameQuery {
      topGame: boardgame(rank: { eq: 1 }) {
        id
        short_description
        name
        fields {
          slug
        }
        images {
          large {
            src
          }
        }
      }
    }
  `)
  return (
    <TopGameWrapper {...data.topGame}>
      <TopGameShadow />
      <TopGameContent>
        <TopGameTitle>{data.topGame.name}</TopGameTitle>
        <TopGameDescription>{data.topGame.short_description}</TopGameDescription>
      </TopGameContent>
    </TopGameWrapper>
  )
}

export default TopGame
