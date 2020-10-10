import { useCallback, useEffect, useRef, useState } from 'react'
import { GameModalContext } from 'src/contexts'
import useGame from 'src/hooks/useGame'

import React from 'react'
import BoardgameModal from 'src/components/BoardgameModal'

const GameModal: React.FC = ({ children }) => {
  const isBrowser = typeof window !== `undefined`
  const prevLocation = useRef({
    path: isBrowser && location.pathname,
    title: isBrowser && document.title,
  })
  const [show, setShow] = useState(false)
  const gameIdRef = useRef<string | null>(null)
  const [game] = useGame(gameIdRef.current)

  const display = useCallback(
    (gameId: string) => {
      if (!show) {
        gameIdRef.current = gameId
        setShow(true)
      }
    },
    [show, gameIdRef]
  )

  useEffect(() => {
    if (show && game) {
      history.pushState(null, `${game.name} | BmB`, game.fields.slug)
    }
  }, [show, game])

  const onModalClose = useCallback(() => {
    if (show) {
      setShow(false)
      history.replaceState(null, prevLocation.current.title, prevLocation.current.path)
    }
  }, [show])

  return (
    <GameModalContext.Provider
      value={{
        display,
        gameId: gameIdRef.current,
      }}
    >
      {children}
      {show && game && <BoardgameModal data={{ boardgame: game }} onClose={onModalClose} />}
    </GameModalContext.Provider>
  )
}

export default GameModal
