import { css } from '@emotion/core'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'gatsby'
import React from 'react'

const MoreInfoButton: React.FC<{ to: string; style?: React.CSSProperties }> = ({ to, style }) => (
  <Link
    style={style}
    to={to}
    role="button"
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
  </Link>
)

export default MoreInfoButton
