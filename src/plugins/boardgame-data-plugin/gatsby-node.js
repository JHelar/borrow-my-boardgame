// eslint-disable-next-line @typescript-eslint/no-var-requires
require('ts-node').register({
	files: true, // so that TS node hooks have access to local typings too
})
exports = require('./src/gatsby-node')