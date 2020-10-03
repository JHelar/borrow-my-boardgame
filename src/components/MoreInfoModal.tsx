import { css } from '@emotion/core'
import styled from '@emotion/styled'
import React, { useCallback, useState } from 'react'
import { animated, useTransition } from 'react-spring'
import { navigate } from 'gatsby'

const ModalContainer = styled.div`
  background-color: #181818;
  opacity: 1;
  transform: none;
  max-width: 850px;
  width: 100%;
  margin: 2em;
  border-radius: 6px;
  overflow: hidden;
`

const MoreInfoModal: React.FC = ({ children }) => {
  const [show, setShow] = useState(true)
  const [{ props, item }] = useTransition(show, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    onDestroyed: () => navigate('/'),
  })

  const closeModal = useCallback(() => {
    if (show) {
      setShow(false)
    }
  }, [show])

  return (
    item && (
      <animated.div
        style={props}
        css={css`
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: flex-start;
          justify-content: center;
          z-index: 4;
          overflow-y: auto;
        `}
        onClick={closeModal}
      >
        <ModalContainer>{children}</ModalContainer>
      </animated.div>
    )
  )
}

export default MoreInfoModal
