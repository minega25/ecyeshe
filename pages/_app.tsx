import { AppProps } from 'next/app'
import { AuthProvider } from 'src/auth/useAuth'
// import { ToastContainer } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      {/* <ToastContainer theme="colored" /> */}
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
