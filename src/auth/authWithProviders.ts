import {
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from 'firebase/auth'
import { firebaseAuth } from './initFirebase'

export const loginWithGoogle = () => {
  const googleProvider = new GoogleAuthProvider()
  return signInWithPopup(firebaseAuth, googleProvider)
}

export const loginWithFacebook = () => {
  const facebookProvider = new FacebookAuthProvider()
  return signInWithPopup(firebaseAuth, facebookProvider)
}
