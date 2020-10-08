import type { GatsbyConfig } from 'gatsby'

import path from 'path'

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
      resolve: 'gatsby-plugin-firebase',
      options: {
        credentials: {
          apiKey: 'AIzaSyCCvTBOXmIXXpSjR0SrwsiPA5KiQeQecHY',
          authDomain: 'borrow-my-boardgame.firebaseapp.com',
          databaseURL: 'https://borrow-my-boardgame.firebaseio.com',
          projectId: 'borrow-my-boardgame',
          storageBucket: 'borrow-my-boardgame.appspot.com',
          messagingSenderId: '983643279668',
          appId: '1:983643279668:web:ffd4371811ac27abebd561',
          measurementId: 'G-46D8BT4X34',
        },
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
