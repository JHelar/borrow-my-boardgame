import styled from '@emotion/styled'
import React from 'react'
import GameShelf from './GameShelf'

export type ListpageData = {
  name: string
  boardgame: {
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
  }[]
}

const ListpageContainer = styled.div`
  padding-top: ${65 + 30}px;
`

const ListpageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 500;
  line-height: 1.2;
  color: white;
  margin: 0;
  padding: 0 4%;
`

const Listpage: React.FC<ListpageData> = ({ name, boardgame }) => (
  <ListpageContainer>
    <ListpageTitle>{name}</ListpageTitle>
    <GameShelf games={boardgame} title={''} wrap />
  </ListpageContainer>
)

export default Listpage
