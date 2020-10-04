import { createContext } from 'react'

const bodyLockDefaultContext = {
  locked: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setLocked: (locked: boolean) => {},
}

export const BodyLockContext = createContext(bodyLockDefaultContext)
