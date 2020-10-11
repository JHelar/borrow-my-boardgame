# BmB - Borrow my boardgame

A gatsby driven JAM stack site with Firebase as serverless database.
Hosted on Firebase at: https://borrow-my-boardgame.web.app/

## Description

Hobby project to test JAM stack and staticly generated website development.
Wanted to also test and wirte a plugin to data scrape another website for data to my project.

The front end is completely made by me from scratch using emotion css to create styled components with Netflix as main design inspiration.

## Requirements

- [Node](https://nodejs.org/) v10+
- [Yarn](https://yarnpkg.com/)
- [Gatsby CLI](https://www.gatsbyjs.org/docs/gatsby-cli/)

## Usage

    gatsby new [name] https://github.com/antoinerousseau/gatsby-starter-antoine
    cd [name]
    cp {example,}.env

And configure your site infos in `package.json` and `src/gatsby/config.ts`.

## Commands

- `yarn develop`: start development mode
- `yarn lint`: check linting (Eslint + Prettier)
- `yarn build`: make production bundle
- `yarn serve`: locally serve production bundle

## Firebase

- `firebase deploy`