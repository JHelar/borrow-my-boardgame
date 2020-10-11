import React from 'react'
import styled from '@emotion/styled'
import { MAIN_BACKGROUND } from 'src/styles/colors'
import { css } from '@emotion/core'

const Container = styled.footer`
  width: 100%;
  min-height: 400px;
  background: ${MAIN_BACKGROUND};
  padding: 0 4%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  color: grey;
`

const Footer: React.FC = () => {
  return (
    <Container>
      <p>
        Created by @JHelar
        <br />
        <a
          css={css`
            font-size: 13px;
            &:hover {
              text-decoration: none;
            }
          `}
          href={'https://github.com/JHelar/borrow-my-boardgame'}
        >
          github project
        </a>
      </p>
    </Container>
  )
}

export default Footer
