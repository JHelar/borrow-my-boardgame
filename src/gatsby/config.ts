import type { GatsbyConfig } from 'gatsby'
import path from 'path'
import firebaseCreds from '../firebase-creds'

const config: GatsbyConfig = {
  siteMetadata: {
    title: `BmB`,
    description: `Borrow my boardgame is a site were you can borrow my boardgames!`,
    locale: `en_GB`,
    siteUrl: `https://gatsby-starter-antoine.netlify.app`,
    keywords: ['gatsby', 'starter', 'gatsby.js', 'template', 'antoine', 'antoinerousseau', 'typescript'],
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-local-search',
      options: {
        name: 'games',
        engine: 'flexsearch',
        query: `
          {
            allBoardgame {
              edges {
                node {
                  id
                  name
                  short_description
                }
              }
            }
          }
        `,
        ref: 'id',
        index: ['name', 'description'],
        store: ['id'],
        normalizer: ({ data }) =>
          data.allBoardgame.edges.map(({ node }) => ({
            id: node.id,
            name: node.name,
            description: node.short_description,
          })),
      },
    },
    {
      resolve: 'gatsby-plugin-firebase',
      options: {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        credentials: firebaseCreds.appCreds,
      },
    },
    `gatsby-plugin-fontawesome-css`,
    `gatsby-plugin-emotion`,
    'boardgame-data-plugin',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.resolve(__dirname, '../images'),
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaultQuality: 75,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Starter Antoine`,
        short_name: `gatsby-starter-antoine`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-typescript`,
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        displayName: process.env.NODE_ENV === 'development',
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS,
        head: false,
        anonymize: true,
        respectDNT: true,
      },
    },
  ],
}

export default config
