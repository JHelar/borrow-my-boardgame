import { createContext } from 'react'

const bodyLockDefaultContext = {
  locked: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setLocked: (locked: boolean) => {},
}

export const BodyLockContext = createContext(bodyLockDefaultContext)

export type GameModalContextType = {
  gameId: string
  display: (gameId: string) => void
}

export const GameModalContext = createContext({
  gameId: '',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  display: (gameId: string) => {},
} as GameModalContextType)
