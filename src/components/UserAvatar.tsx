import styled from '@emotion/styled'
import React, { useState } from 'react'
import useAuth from 'src/hooks/useAuth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import { css } from '@emotion/core'

const CTAButton = styled.button`
  background-color: #e50914;
  line-height: normal;
  padding: 7px 17px;
  font-weight: 400;
  font-size: 1rem;
  color: #fff;
  border: 0;
  border-radius: 3px;
`

const AvatarWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  height: 100%;
`

const AvatarImage = styled.img`
  vertical-align: middle;
  height: 32px;
  width: 32px;
  border-radius: 4px;
  object-fit: cover;
`

const AvatarInfo = styled.div`
  position: absolute;
  background: rgba(0, 0, 0, 0.8);
  padding: 15px;
  right: 0;
  top: calc(100% + 2px);
  border: 1px solid rgba(40, 40, 40, 1);
`

const UserAvatar: React.FC = () => {
  const [loggedIn, user, loading, login, logout] = useAuth()
  const [hovering, setHovering] = useState(false)

  if (!loggedIn) {
    return (
      <CTAButton
        onClick={() => {
          if (!loading) {
            login()
            setHovering(false)
          }
        }}
      >
        {loading ? 'Loading' : 'Login'}
      </CTAButton>
    )
  }
  return (
    <AvatarWrapper onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
      <AvatarImage src={user.photoURL} />
      {hovering && (
        <AvatarInfo>
          <CTAButton onClick={logout}>Logout</CTAButton>
          <FontAwesomeIcon
            icon={faCaretUp}
            css={css`
              color: white;
              position: absolute;
              top: -14px;
              right: 25px;
              transform: translateX(-50%);
            `}
          />
        </AvatarInfo>
      )}
      <FontAwesomeIcon
        icon={faCaretDown}
        css={css`
          color: white;
          margin-left: 10px;
        `}
      />
    </AvatarWrapper>
  )
}

export default UserAvatar
