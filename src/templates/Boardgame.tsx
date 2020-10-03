import React from 'react'
import { graphql } from 'gatsby'
import Layout from 'src/layout'
import MoreInfoModal from 'src/components/MoreInfoModal'
import { css } from '@emotion/core'
import styled from '@emotion/styled'

type BoardgameData = {
  data: {
    boardgame: {
      name: string
      description: string
      images: {
        large: {
          src: string
        }
      }
      info: {
        designer: { name: string; id: string; fields: { slug: string } }[]
        category: { name: string; id: string; fields: { slug: string } }[]
      }
    }
  }
}

const BoardgameImage: React.FC<{ imageSrc: string }> = ({ imageSrc }) => (
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
    ></div>
  </div>
)

const BoardgameContent = styled.div`
  padding: 0 3rem;
`

const BoardgameDescription = styled.p`
  line-height: 27px;
  font-size: 18px;
  color: white;
  margin-bottom: 0.5em;
`

const Boardgame = ({ data }: BoardgameData) => {
  const {
    name,
    description,
    images,
    info: { designer, category },
  } = data.boardgame
  return (
    <Layout title={`${name}`} lockScroll>
      <MoreInfoModal>
        <BoardgameImage imageSrc={images.large.src} />
        <BoardgameContent>
          <BoardgameDescription dangerouslySetInnerHTML={{ __html: description }}></BoardgameDescription>
        </BoardgameContent>
      </MoreInfoModal>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    boardgame(fields: { slug: { eq: $slug } }) {
      name
      description
      images {
        large {
          src
        }
      }
      info {
        designer {
          name
          id
          fields {
            slug
          }
        }
        category {
          id
          name
          fields {
            slug
          }
        }
      }
    }
  }
`

export default Boardgame
