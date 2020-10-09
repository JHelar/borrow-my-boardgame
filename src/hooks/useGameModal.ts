import { useContext } from 'react'
import { GameModalContext } from '../contexts'

const useGameModal = () => {
  const context = useContext(GameModalContext)
  return context
}

export default useGameModal
