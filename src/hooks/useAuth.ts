import firebase from 'gatsby-plugin-firebase'
import useAuthState from './useAuthState'

const login = () => {
  firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
}

const logout = () => {
  firebase.auth().signOut()
}

const useAuth = (): [
  loggedIn: boolean,
  user: firebase.User,
  loading: boolean,
  login: () => void,
  logout: () => void
] => {
  const [user, loading, error] = useAuthState(firebase)

  return [!!user, user, loading, login, logout]
}

export default useAuth
