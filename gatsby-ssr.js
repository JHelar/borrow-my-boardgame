/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */
require('./src/gatsby/firebaseImports')
exports.onRenderBody = require('./src/gatsby/onRenderBody').default
exports.wrapRootElement = require('./src/layout/root').default
exports.wrapPageElement = require('./src/layout/page').default
