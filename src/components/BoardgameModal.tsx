import React from 'react'
import { Link } from 'gatsby'
import MoreInfoModal from 'src/components/MoreInfoModal'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faClock, faTrophy } from '@fortawesome/free-solid-svg-icons'
import RentGameButton from 'src/components/RentGameButton'

type BoardgameContributor = { name: string; id: string; fields: { slug: string } }

export type Boardgame = {
  id: string
  name: string
  description: string
  minage: string
  minplayers: string
  maxplayers: string
  minplaytime: string
  maxplaytime: string
  yearpublished: string
  rank: string
  images: {
    large: {
      src: string
    }
  }
  info: {
    designer: BoardgameContributor[]
    category: BoardgameContributor[]
    mechanic: BoardgameContributor[]
    publisher: BoardgameContributor[]
  }
}

export type BoardgameData = {
  data: {
    boardgame: Boardgame
  }
}

const BoardgameImage: React.FC<{ imageSrc: string }> = ({ imageSrc, children }) => (
  <div
    css={css`
      padding-top: 56.3925%;
      width: 100%;
      background-image: url('${imageSrc}');
      background-size: cover;
      background-position: center;
      position: relative;
    `}
  >
    <div
      css={css`
        background-image: linear-gradient(to top, #181818, transparent 50%);
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
      `}
    >
      {children}
    </div>
  </div>
)

const BoardgameContent = styled.div`
  padding: 0 3rem;
  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
  column-gap: 2em;
  display: grid;
`

const BoardgameHeaderContent = styled.div`
  position: absolute;
  bottom: 0.5em;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 3rem;
  padding-bottom: 40px;
`

const BoardgameTitle = styled.h1`
  margin: 0;
  font-size: 55px;
  font-weight: bold;
  margin-bottom: 20px;
  line-height: 1;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.45);
`

const BoardgameDescription = styled.p`
  line-height: 27px;
  font-size: 18px;
  color: white;
  margin-bottom: 0.5em;
`

const BoardgameInfo: React.FC<Pick<
  Boardgame,
  'minage' | 'minplaytime' | 'maxplaytime' | 'yearpublished' | 'minplayers' | 'maxplayers'
>> = ({ yearpublished, minage, minplaytime, maxplaytime, minplayers, maxplayers }) => {
  const minTime = parseInt(minplaytime)
  const maxTime = parseInt(maxplaytime)
  return (
    <div
      css={css`
        margin: 0.8em 0;
        display: grid;
        grid-template-columns: repeat(4, max-content);
        column-gap: 1em;
        color: white;
        font-size: 16px;
        font-weight: 600;
        line-height: 1.2;
      `}
    >
      <span>{yearpublished}</span>
      <span
        css={css`
          border: solid 1px rgba(255, 255, 255, 0.4);
          padding: 0 0.4em;
        `}
      >
        {minage}
        {'+'}
      </span>
      <span>
        <FontAwesomeIcon icon={faClock} /> {minTime}
        {maxTime !== minTime && ' - ' + maxTime}m
      </span>
      <span>
        <FontAwesomeIcon icon={faUsers} /> {minplayers}
        {maxplayers !== minplayers && ' - ' + maxplayers}
      </span>
    </div>
  )
}

const ContributorList: React.FC<{ name: string; items: BoardgameContributor[] }> = ({ name: listName, items }) => (
  <ul
    css={css`
      font-size: 14px;
      font-weight: 600;
      line-height: 20px;
      display: flex;
      flex-flow: row wrap;
      margin: 0.5em;
      list-style: none;
      padding: 0;
    `}
  >
    <li>
      <span
        css={css`
          color: #777;
          margin-right: 0.5em;
        `}
      >
        {listName}:
      </span>
    </li>
    {items.map(({ name, id, fields: { slug } }, index) => (
      <li key={id}>
        <Link
          css={css`
            color: white;
            text-decoration: none;
            padding-right: 0.3em;
            &:hover {
              text-decoration: underline;
            }
          `}
          to={slug}
        >
          {name}
          {index + 1 === items.length ? '' : ','}
        </Link>
      </li>
    ))}
  </ul>
)

const BoardgameModal: React.FC<BoardgameData & { onClose: () => void }> = ({ data, onClose }) => {
  const {
    id,
    name,
    description,
    images,
    rank,
    info: { designer, category, mechanic, publisher },
  } = data.boardgame

  return (
    <MoreInfoModal onClose={onClose}>
      <BoardgameImage imageSrc={images.large.src}>
        <BoardgameHeaderContent>
          <BoardgameTitle>{name}</BoardgameTitle>
          <RentGameButton gameId={id} />
        </BoardgameHeaderContent>
      </BoardgameImage>
      <BoardgameContent>
        <div>
          <BoardgameInfo {...data.boardgame} />
          {parseInt(rank) <= 10 && (
            <span
              css={css`
                color: white;
                font-size: 16px;
                font-weight: 600;
              `}
            >
              <FontAwesomeIcon icon={faTrophy} /> No.{rank} Boardgame of all time
            </span>
          )}
          <BoardgameDescription dangerouslySetInnerHTML={{ __html: description }}></BoardgameDescription>
        </div>
        <div>
          <ContributorList name={'Designer'} items={designer} />
          <ContributorList name={'Category'} items={category} />
          <ContributorList name={'Mechanic'} items={mechanic} />
          <ContributorList name={'Publisher'} items={publisher} />
        </div>
      </BoardgameContent>
    </MoreInfoModal>
  )
}

export default BoardgameModal
