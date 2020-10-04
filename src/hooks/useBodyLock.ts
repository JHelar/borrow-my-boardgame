import { useContext } from 'react'
import { BodyLockContext } from '../contexts'

const useBodyLock = () => {
  const context = useContext(BodyLockContext)
  return context
}

export default useBodyLock
