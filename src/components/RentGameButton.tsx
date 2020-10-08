import { css } from '@emotion/core'
import React, { useEffect } from 'react'
import useAuth from 'src/hooks/useAuth'
import useGame from 'src/hooks/useGame'

const RentGameButton: React.FC<{ gameId: string }> = ({ gameId }) => {
  const [loggedIn, user] = useAuth()
  const [game, rent, renting] = useGame(gameId)

  console.log({
    game,
  })

  if (loggedIn) {
    return (
      <button
        css={css`
          text-decoration: none;
          display: flex;
          justify-content: center;
          align-items: center;
          opacity: 1;
          padding: 0.8rem;
          padding-left: 2rem;
          padding-right: 2.4rem;
          border-radius: 4px;
          border: 0;
          background-color: white;
          color: black;
          font-size: 1.6rem;
          font-weight: bold;
          &:hover {
            background-color: rgba(255, 255, 255, 0.75);
          }
        `}
        onClick={rent}
        disabled={renting}
      >
        Rent
      </button>
    )
  }
  return null
}

export default RentGameButton
