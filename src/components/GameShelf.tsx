import { css } from '@emotion/core'
import styled from '@emotion/styled'
import React, { useEffect, useRef, useState } from 'react'
import { MAIN_BACKGROUND } from 'src/styles/colors'
import { Motion, spring } from 'react-motion'

type Game = {
  id: string
  name: string
  short_description: string
  fields: {
    slug: string
  }
  images: {
    medium: {
      src: string
    }
  }
}

type GameShelfProps = {
  title: string
  games: Array<Game>
}

const ShelfItemImage = styled.div<Pick<Game, 'images'>>`
  background-image: url('${({
    images: {
      medium: { src },
    },
  }) => src}');
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
  border-radius: 5px;
`

const ShelfItemContent = styled.div`
  position: absolute;
  width: 18vw;
  height: 16vw;
  z-index: 2;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 15px 4px black;
  overflow: hidden;
  border-radius: 5px;
  left: -25%;
  top: -50%;
`

const ShelfItemDetails = styled.div`
  padding: 10px;
  background: ${MAIN_BACKGROUND};
  flex: 1;
`
const ShelfItemContentImage = styled.div<Pick<Game, 'images'>>`
  background-image: url('${({
    images: {
      medium: { src },
    },
  }) => src}');
  background-size: cover;
  background-position: center;
  flex: 0 0 60%;
`

const ShelfItemTitle = styled.h3`
  color: white;
  font-size: 1vw;
  margin: 0;
`

const ShelfItemDescription = styled.p`
  color: white;
  font-size: 0.75vw;
  margin: 0;
  margin-top: 5px;
`

const ShelfItem = (game: Game) => {
  const [hovering, setHovering] = useState(false)

  return (
    <li
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      css={css`
        display: block;
        flex: 0 0 calc(100% / 8);
        height: 125px;
        padding: 0 2.5px;
        position: relative;
        @media screen and (max-width: 1099px) and (min-width: 800px) {
          flex-basis: 25%;
        }
      `}
    >
      <ShelfItemImage {...game} />
      {hovering && (
        <Motion defaultStyle={{ x: 0 }} style={{ x: spring(1) }}>
          {(interpolatedStyles) => (
            <ShelfItemContent style={{ transform: `scale(${interpolatedStyles.x})` }}>
              <ShelfItemContentImage {...game} />
              <ShelfItemDetails>
                <ShelfItemTitle>{game.name}</ShelfItemTitle>
                <ShelfItemDescription>{game.short_description}</ShelfItemDescription>
              </ShelfItemDetails>
            </ShelfItemContent>
          )}
        </Motion>
      )}
    </li>
  )
}

const ShelfContainer = styled.div`
  width: 100%;
  padding-left: 4%;
  padding-bottom: 2rem;
`

const ShelfList = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  margin: 0 -2.5px;
  padding: 0;
`

const ShelfTitle = styled.h2`
  color: white;
  font-size: 1.4vw;
  font-weight: bold;
  margin: 0;
  margin-bottom: 0.6rem;
`

const GameShelf: React.FC<GameShelfProps> = ({ title, games }) => (
  <ShelfContainer>
    <ShelfTitle>{title}</ShelfTitle>
    <ShelfList>
      {games.map((game) => (
        <ShelfItem key={game.id} {...game} />
      ))}
    </ShelfList>
  </ShelfContainer>
)

export default GameShelf
