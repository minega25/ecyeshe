import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from 'react'
import { User } from 'firebase/auth'
import { firebaseAuth } from './initFirebase'
import { useRouter } from 'next/router'
import { removeTokenCookie, setTokenCookie } from './tokenCookies'

interface IAuthContext {
  logout: () => void
  user: User | null
  isAuthenticated: boolean
}

interface IAuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext<IAuthContext>({
  logout: () => null,
  isAuthenticated: false,
  user: null,
})

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  const logout = () => {
    firebaseAuth
      .signOut()
      .then(() => {
        router.push('/')
      })
      .catch((error) => {
        console.error(error)
      })
  }

  useEffect(() => {
    const cancelAuthListener = firebaseAuth.onIdTokenChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken()
        setTokenCookie(token)
        setUser(user)
      } else {
        removeTokenCookie()
        setUser(null)
      }
    })

    return () => {
      cancelAuthListener()
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
