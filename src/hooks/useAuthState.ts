/* by Jeffrey Meng | MIT License */
import { useEffect, useReducer, useState } from 'react'
import { auth as firebaseAuth, User } from 'firebase'

interface FirebaseWithAuth {
  auth: () => firebaseAuth.Auth
}

export default function useAuthState(
  firebase: FirebaseWithAuth
): [User | undefined, boolean, firebaseAuth.Error | undefined] {
  const [auth, setAuth] = useState<undefined | firebaseAuth.Auth>(undefined)

  interface State {
    user: User | undefined
    loading: boolean
    error: firebaseAuth.Error | undefined
  }

  type Action = { type: 'auth_state_changed'; user: User } | { type: 'error'; error: firebaseAuth.Error }

  const [authState, dispatch] = useReducer(
    (state: State, action: Action) => {
      switch (action.type) {
        case 'auth_state_changed':
          return {
            ...state,
            user: action.user,
            loading: false,
          }
        case 'error':
          return {
            ...state,
            error: action.error,
            loading: false,
          }
      }
    },
    {
      user: undefined,
      loading: true,
      error: undefined,
    }
  )
  useEffect(() => {
    setAuth(firebase.auth())
  }, [firebase])

  useEffect(() => {
    if (auth === undefined) return

    const unsubscribe = auth.onAuthStateChanged(
      (user): void => {
        dispatch({ type: 'auth_state_changed', user })
      },
      (error: auth.Error): void => {
        dispatch({ type: 'error', error })
      }
    )

    return (): void => {
      unsubscribe()
    }
  }, [auth])
  return [authState.user, authState.loading, authState.error]
}
