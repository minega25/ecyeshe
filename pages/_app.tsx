import { AppProps } from 'next/app'
import { AuthProvider } from 'src/auth/useAuth'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
