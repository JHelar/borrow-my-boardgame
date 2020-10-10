import { css } from '@emotion/core'
import styled from '@emotion/styled'
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { MAIN_BACKGROUND } from 'src/styles/colors'
import { useSpring, animated, config, AnimatedValue } from 'react-spring'
import MoreInfoButton from './MoreInfoButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import throttle from 'lodash.throttle'

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
  wrap?: boolean
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

const ShelfItemContent: React.FC<{
  hovering: boolean
  containerWidth: number
  leftEdge?: boolean
  rightEdge?: boolean
}> = ({ hovering, children, containerWidth, leftEdge, rightEdge }) => {
  const props = useSpring({
    height: hovering ? 400 : 125,
    width: hovering ? 400 : containerWidth,
    left: hovering && !leftEdge ? (rightEdge ? -(400 - containerWidth) : -((400 - containerWidth) / 2)) : 0,
    top: hovering ? -((400 - 125) / 2) : 0,
    zIndex: hovering ? 3 : 1,
    immediate: (key) => key === 'zIndex',
  })
  return (
    <animated.div
      style={props}
      css={css`
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

const ShelfItem: React.FC<{
  game: Game
  wrap: boolean
  leftEdge?: boolean
  rightEdge?: boolean
  containerSize: DOMRect | null
  setContainerSize: (rect: DOMRect) => void
}> = ({ game, wrap, leftEdge, rightEdge, containerSize, setContainerSize }) => {
  const [hovering, setHovering] = useState(false)
  const containerRef = useRef<HTMLLIElement>(null)

  useLayoutEffect(() => {
    if (containerRef.current && !containerSize) {
      setContainerSize(containerRef.current.getBoundingClientRect())
    }
  }, [hovering, containerRef, containerSize, setContainerSize])

  return (
    <li
      ref={containerRef}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      css={css`
        display: block;
        flex: 0 0 calc(100% / 8);
        height: 125px;
        margin: ${wrap ? 40 : 0}px 2.5px;
        position: relative;
        @media screen and (max-width: 1099px) and (min-width: 800px) {
          flex-basis: 25%;
        }
      `}
    >
      <ShelfItemContent
        hovering={hovering}
        containerWidth={containerSize?.width || 0}
        leftEdge={leftEdge}
        rightEdge={rightEdge}
      >
        <ShelfItemImage hovering={hovering} {...game} />
        <ShelfItemDetails hovering={hovering}>
          <ShelfItemTitle>{game.name}</ShelfItemTitle>
          <ShelfItemDescription>{game.short_description}</ShelfItemDescription>
          <MoreInfoButton gameId={game.id} />
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

const ShelfList: React.FC<{ wrap: boolean; transition: AnimatedValue<any> }> = ({ wrap, children, transition }) => {
  const [hovering, setHovering] = useState(false)
  return (
    <div style={{ marginRight: 'calc(100% / 13 * -1)' }}>
      <animated.ul
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        style={transition}
        css={`
          list-style: none;
          display: flex;
          flex-flow: row ${wrap ? 'wrap' : 'no-wrap'};
          width: 100%;
          margin: ${wrap ? '-40px -2.5px' : '0 -2.5px'};
          padding: 0;
          z-index: ${hovering ? 1 : 0};
          position: relative;
        `}
      >
        {children}
      </animated.ul>
    </div>
  )
}

const ShelfListWrapper: React.FC = ({ children }) => {
  const [hovering, setHovering] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      css={`
        z-index: ${hovering ? 1 : 0};
        position: relative;
      `}
    >
      {children}
    </div>
  )
}

const ShelfTitle = styled.h2`
  color: white;
  font-size: 1.4vw;
  font-weight: bold;
  margin: 0;
  margin-bottom: 0.6rem;
`

const ShelfScrollButton: React.FC<{ onClick: () => void; isRight?: boolean }> = ({ children, onClick, isRight }) => (
  <button
    onClick={() => onClick()}
    css={css`
      position: absolute;
      right: ${isRight ? 0 : 'auto'};
      left: ${!isRight ? '-4.25%' : 'auto'};
      background: linear-gradient(to ${isRight ? 'right' : 'left'}, rgba(20, 20, 20, 0.25), rgba(20, 20, 20, 0.5));
      border: 0;
      border-radius: 0;
      top: 0;
      bottom: 0;
      width: calc(${100 / 8 / 2}% - ${16 * 2.5}px);
      z-index: 2;
      outline: 0;
      padding: 0;
      > svg {
        display: none;
      }
      &:hover {
        background-color: rgba(20, 20, 20, 0.8);

        > svg {
          display: inline-block;
        }
      }
    `}
  >
    <FontAwesomeIcon
      icon={isRight ? faChevronRight : faChevronLeft}
      css={css`
        color: white;
        font-size: 55px;
      `}
    />
  </button>
)

const GameShelf: React.FC<GameShelfProps> = ({ title, games, wrap }) => {
  const [containerSize, setContainerSize] = useState<DOMRect>(null)
  const [carouselStep, setCarouselStep] = useState(0)
  const [rewindToStart, setRewindToStart] = useState(false)
  const maxSteps = 7
  const gamesRef = useRef(games)
  const beenScrolled = useRef(false)
  const stepsRef = useRef(games.length - maxSteps)
  const transitionRest = useCallback(() => {
    if (rewindToStart) {
      setCarouselStep(0)
      setRewindToStart(false)
      gamesRef.current = [...games]
    }
  }, [rewindToStart, games])
  const transitionSpring = useSpring({
    transform: wrap
      ? 'translateX(0px)'
      : rewindToStart
      ? `translateX(-${(containerSize?.width + 5) * (maxSteps + 3) || 0}px)`
      : `translateX(-${carouselStep * (containerSize?.width + 2.5 * 2 || 0)}px)`,
    onRest: transitionRest,
    immediate: (key) => carouselStep === 0 && !rewindToStart && key === 'transform',
  })

  useEffect(() => {
    gamesRef.current = games
    if (wrap) {
      setCarouselStep(carouselStep + 1)
    }
  }, [games])

  const rightButtonClick = () => {
    if (carouselStep < stepsRef.current) {
      setCarouselStep(carouselStep + 1)

      // Put the carouselStep item to back of games
      gamesRef.current = [...gamesRef.current, games[carouselStep]]
    } else {
      // Rewind to start
      // Set rest of games to the array
      const addSteps = maxSteps - carouselStep
      gamesRef.current = [...gamesRef.current, ...games.slice(carouselStep, carouselStep + addSteps + 1)]
      setRewindToStart(true)
    }
    beenScrolled.current = true
  }
  return (
    <ShelfContainer>
      <ShelfTitle>{title}</ShelfTitle>
      <ShelfListWrapper>
        {!wrap && beenScrolled.current && (
          <ShelfScrollButton
            onClick={() =>
              carouselStep > 0 ? setCarouselStep(carouselStep - 1) : setCarouselStep(stepsRef.current - 1)
            }
          />
        )}
        <ShelfList wrap={wrap} transition={transitionSpring}>
          {gamesRef.current.map((game, index) => {
            const leftEdge = wrap ? index % maxSteps === 0 : index % (maxSteps + 1) === carouselStep
            const rightEdge = wrap
              ? index % maxSteps === 6
              : index % (maxSteps + 1) === (maxSteps - 1 + carouselStep) % (maxSteps + 1)
            return (
              <ShelfItem
                containerSize={containerSize}
                setContainerSize={setContainerSize}
                key={index + game.id}
                game={game}
                wrap={wrap}
                leftEdge={leftEdge}
                rightEdge={rightEdge}
              />
            )
          })}
        </ShelfList>
        {!wrap && <ShelfScrollButton isRight onClick={rightButtonClick} />}
      </ShelfListWrapper>
    </ShelfContainer>
  )
}

export default GameShelf
