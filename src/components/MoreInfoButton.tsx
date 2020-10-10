import { css } from '@emotion/core'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useCallback } from 'react'
import useGameModal from 'src/hooks/useGameModal'

const MoreInfoButton: React.FC<{ gameId: string; style?: React.CSSProperties }> = ({ gameId, style }) => {
  const { display } = useGameModal()
  const onShowModal = useCallback(() => {
    display(gameId)
  }, [gameId, display])
  return (
    <>
      <button
        onClick={onShowModal}
        style={{ ...style }}
        role="button"
        css={css`
          border: 0;
          text-decoration: none;
          display: flex;
          justify-content: center;
          align-items: center;
          opacity: 1;
          padding: 0.8rem;
          padding-left: 2rem;
          padding-right: 2.4rem;
          border-radius: 4px;
          background-color: rgba(109, 109, 110, 0.7);
          color: white;
          font-size: 1.6rem;
          font-weight: bold;
          &:hover {
            background-color: rgba(109, 109, 110, 0.4);
          }
        `}
      >
        <FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: '.5rem' }} /> More info
      </button>
    </>
  )
}

export default MoreInfoButton
