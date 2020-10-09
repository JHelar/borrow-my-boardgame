import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { faUndoAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import useAuth from 'src/hooks/useAuth'
import useGame from 'src/hooks/useGame'

const infoTextBackgrounds = {
  gray: '20, 20, 20',
  yellow: '229, 200, 9',
  green: '9, 229, 53',
  white: 'white',
  red: '229, 9, 9',
}

const InfoText = styled.span<{ background?: keyof typeof infoTextBackgrounds }>`
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
  padding: 0.8rem;
  padding-left: 2rem;
  padding-right: 2.4rem;
  border-radius: 4px;
  border: 1px solid
    ${({ background = 'white' }) => (background === 'white' ? 'white' : `rgba(${infoTextBackgrounds[background]}, 1)`)};
  background-color: ${({ background = 'white' }) =>
    background === 'white' ? 'white' : `rgba(${infoTextBackgrounds[background]}, 0.6)`};
  color: black;
  font-size: 1.6rem;
  font-weight: bold;
`

const RentedWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`

const RentGameButton: React.FC<{ gameId: string }> = ({ gameId }) => {
  const [loggedIn, user] = useAuth()
  const [game, rent, renting, returnGame] = useGame(gameId)

  if (loggedIn && game) {
    if (game.rented) {
      if (user.uid !== game.rentedBy) {
        return <InfoText background={'red'}>Rented</InfoText>
      }
      return (
        <RentedWrapper>
          <InfoText background={'green'}>Rented</InfoText>
          <button
            css={css`
              background: 0;
              background-color: white;
              border: 0;
              border-radius: 50%;
              margin-left: 1rem;
              display: block;
              width: 3rem;
              height: 3rem;

              &:hover {
                background-color: rgba(255, 255, 255, 0.75);
              }
            `}
            onClick={returnGame}
            disabled={renting}
          >
            <FontAwesomeIcon
              icon={faUndoAlt}
              css={css`
                font-size: 1.5rem;
              `}
            />
          </button>
        </RentedWrapper>
      )
    }
    return (
      <button
        css={css`
          border: 0;
          background: 0;
        `}
        onClick={rent}
        disabled={renting}
      >
        <InfoText
          css={css`
            background-color: white;
            &:hover {
              background-color: rgba(255, 255, 255, 0.75);
            }
          `}
        >
          Rent
        </InfoText>
      </button>
    )
  }
  return null
}

export default RentGameButton
