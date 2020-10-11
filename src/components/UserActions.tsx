import styled from '@emotion/styled'
import React, { useCallback, useEffect, useReducer, useRef, useState } from 'react'
import useAuth from 'src/hooks/useAuth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp, faDice, faSearch } from '@fortawesome/free-solid-svg-icons'
import { css } from '@emotion/core'
import { Link } from 'gatsby'
import { navigate } from 'gatsby'
import { animated, useSpring } from 'react-spring'
import debounce from 'lodash.debounce'
import useSearch from 'src/hooks/useSearch'

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
  top: calc(100%);
  border: 1px solid rgba(40, 40, 40, 1);
`

const UserActionWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  align-items: center;
`

export type SearchFieldProps = { expandByDefault?: boolean; defaultQuery?: string }

const SearchField: React.FC<SearchFieldProps> = ({ expandByDefault, defaultQuery }) => {
  const { setQuery } = useSearch()
  const [expanded, setExpanded] = useState(expandByDefault)
  const inputRef = useRef<HTMLInputElement>(null)
  const inputWidth = useSpring({
    width: expanded ? 200 : 0,
    marginLeft: expanded ? 15 : 0,
    onStart: () => {
      if (expanded && inputRef.current) {
        inputRef.current.focus()
      }
    },
  })

  useEffect(() => {
    if (defaultQuery) {
      console.log('SETTING DEFAULT')
      setQuery(defaultQuery)
    }
  }, [defaultQuery, setQuery])

  const navigateToSearch = debounce((query: string) => {
    if (query) {
      navigate('/search?query=' + query, {
        state: {
          query,
        },
        replace: true,
      })
      setQuery(query)
    } else {
      navigate('/')
    }
  }, 50)

  const onQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.currentTarget.value
    navigateToSearch(query)
  }

  return (
    <div
      css={css`
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        margin-right: 20px;

        background-color: ${expanded ? 'black' : 'transparent'};
        padding: 5px;
        border: 1px solid ${expanded ? 'white' : 'transparent'};
      `}
    >
      <button
        css={css`
          border: 0;
          background: 0;
          padding: 0;
          margin: 0;

          &:focus {
            outline: none;
          }
        `}
        onClick={() => setExpanded(!expanded)}
      >
        <FontAwesomeIcon
          icon={faSearch}
          css={css`
            color: white;
            font-size: 25px;
          `}
        />
      </button>
      <animated.input
        onChange={onQueryChange}
        defaultValue={defaultQuery}
        style={inputWidth}
        type="text"
        placeholder={'Title'}
        ref={inputRef}
        css={css`
          display: block;
          background: black;
          border: 0;
          color: white;
          font-size: 16px;
          line-height: 1;
          padding: 0;
          &:focus {
            outline: none;
          }
        `}
      />
    </div>
  )
}

const UserActions: React.FC<SearchFieldProps> = (props) => {
  const [loggedIn, user, loading, login, logout] = useAuth()
  const [hovering, setHovering] = useState(false)

  if (!loggedIn) {
    return (
      <UserActionWrapper>
        <SearchField {...props} />
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
      </UserActionWrapper>
    )
  }
  return (
    <UserActionWrapper>
      <SearchField {...props} />
      <Link
        to={'/renting'}
        state={{
          name: user.displayName,
          id: user.uid,
        }}
        css={css`
          color: white;
          display: block;
          text-decoration: none;
          margin-right: 25px;
        `}
      >
        <FontAwesomeIcon
          css={css`
            font-size: 32px;
          `}
          icon={faDice}
        />
      </Link>
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
                top: -12px;
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
    </UserActionWrapper>
  )
}

export default UserActions
