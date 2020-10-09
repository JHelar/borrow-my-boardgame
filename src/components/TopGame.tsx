import React from 'react'
import styled from '@emotion/styled'
import { graphql, useStaticQuery } from 'gatsby'
import { css } from '@emotion/core'
import MoreInfoButton from './MoreInfoButton'

type TopGameData = {
  id: string
  name: string
  short_description: string
  minage: string
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
  align-items: flex-start;
  padding: 0 4%;
  padding-top: ${56.25 / 4}vw;
`

const TopGameTitle = styled.h1`
  font-size: 4vw;
  font-weight: bold;
  color: white;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.45);
`

const TopGameSubtitle = styled.h2`
  color: white;
  font-size: 1.6vw;
  margin: 1vw 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.45);
`

const TopGameDescription = styled.p`
  color: white;
  font-size: 1.4vw;
  font-weight: 400;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.45);
`

const MinAge = ({ minage }: Pick<TopGameData, 'minage'>) => (
  <span
    css={css`
      background-color: rgba(51, 51, 51, 0.6);
      font-size: 1.1vw;
      padding: 0.5vw 3.5vw 0.5vw 0.8vw;
      display: flex;
      align-items: center;
      height: 2.4vw;
      border: solid 3px #dcdcdc;
      border-style: none none none solid;
      position: absolute;
      bottom: 35%;
      right: 0;
      color: white;
    `}
  >
    {minage}+
  </span>
)

const TopGame: React.FC = () => {
  const data = useStaticQuery<{ topGame: TopGameData }>(graphql`
    query TopGameQuery {
      topGame: boardgame(rank: { eq: 1 }) {
        id
        short_description
        name
        minage
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
        <TopGameSubtitle>No.1 Boardgame of all time</TopGameSubtitle>
        <TopGameDescription>{data.topGame.short_description}</TopGameDescription>
        <MoreInfoButton style={{ marginTop: '1vw' }} gameId={data.topGame.id} />
      </TopGameContent>
      <MinAge {...data.topGame} />
    </TopGameWrapper>
  )
}

export default TopGame
