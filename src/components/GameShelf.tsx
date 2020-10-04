import { css } from '@emotion/core'
import styled from '@emotion/styled'
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { MAIN_BACKGROUND } from 'src/styles/colors'
import { useSpring, animated, config } from 'react-spring'
import MoreInfoButton from './MoreInfoButton'

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

const ShelfItemImage = styled.div<Pick<Game, 'images'> & { hovering: boolean }>`
  background-image: url('${({
    images: {
      medium: { src },
    },
  }) => src}');
  background-size: cover;
  background-position: center;
  flex: 1 0 100%;
`

const ShelfItemContent: React.FC<{ hovering: boolean; containerWidth: number }> = ({
  hovering,
  children,
  containerWidth,
}) => {
  const [reRender, setReRender] = useState(false)
  const zIndexRef = useRef(1)

  const onAnimationEnd = useCallback(() => {
    if (!hovering) {
      // Left
      zIndexRef.current = 1
      setReRender(!reRender)
    }
  }, [hovering])

  const onAnimationStart = useCallback(() => {
    if (hovering) {
      // Entering
      zIndexRef.current = 3
    } else {
      // Leaving
      zIndexRef.current = 2
    }
  }, [hovering])

  const props = useSpring({
    height: hovering ? 400 : 125,
    width: hovering ? 400 : containerWidth,
    left: hovering ? -((400 - containerWidth) / 2) : 0,
    top: hovering ? -((400 - 125) / 2) : 0,
    onRest: onAnimationEnd,
    onStart: onAnimationStart,
  })
  return (
    <animated.div
      style={props}
      css={css`
        z-index: ${zIndexRef.current};
        min-width: 100%;
        position: absolute;
        width: 100%;
        bottom: 0;
        left: 0;
        right: 0;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        border-radius: 5px;
        box-shadow: ${hovering ? '0 0 15px 3px black' : 'none'};
      `}
    >
      {children}
    </animated.div>
  )
}

const ShelfItemTitle = styled.h3`
  color: white;
  font-size: 1.3rem;
  margin: 0;
  margin-bottom: 15px;
`

const ShelfItemDescription = styled.p`
  color: white;
  font-size: 0.8rem;
  margin: 0;
  margin-bottom: 15px;
`

const ShelfItemDetails: React.FC<{ hovering: boolean }> = ({ children, hovering }) => {
  const props = useSpring({ transform: hovering ? 'translateY(0)' : 'translateY(100%)', opacity: hovering ? 1 : 0 })
  return (
    <animated.div
      style={props}
      css={css`
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 20px 15px;
        background: ${MAIN_BACKGROUND};
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      `}
    >
      {children}
    </animated.div>
  )
}

const ShelfItem = (game: Game) => {
  const [hovering, setHovering] = useState(false)
  const containerRef = useRef<HTMLLIElement>(null)
  const [containerSize, setContainerSize] = useState<DOMRect>(null)

  useLayoutEffect(() => {
    if (containerRef.current) {
      setContainerSize(containerRef.current.getBoundingClientRect())
    }
  }, [hovering, containerRef])

  return (
    <li
      ref={containerRef}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      css={css`
        display: block;
        flex: 0 0 calc(100% / 8);
        height: 125px;
        margin: 0 2.5px;
        position: relative;
        @media screen and (max-width: 1099px) and (min-width: 800px) {
          flex-basis: 25%;
        }
      `}
    >
      <ShelfItemContent hovering={hovering} containerWidth={containerSize?.width || 0}>
        <ShelfItemImage hovering={hovering} {...game} />
        <ShelfItemDetails hovering={hovering}>
          <ShelfItemTitle>{game.name}</ShelfItemTitle>
          <ShelfItemDescription>{game.short_description}</ShelfItemDescription>
          <MoreInfoButton to={game.fields.slug} />
        </ShelfItemDetails>
      </ShelfItemContent>
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
