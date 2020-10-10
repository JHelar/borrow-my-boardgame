import path from 'path'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const config: { appCreds: Record<string, string>; writerCreds: Record<string, string> } = require(path.resolve(
  __dirname,
  '../.firebase-creds'
))

export default config
