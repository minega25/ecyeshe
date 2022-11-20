import { AppProps } from 'next/app'
import { AuthProvider } from 'src/auth/useAuth'
import { MantineProvider } from '@mantine/core'
// import { ToastContainer } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: 'light',
        colors: {
          brand: [
            '#F0BBDD',
            '#ED9BCF',
            '#EC7CC3',
            '#ED5DB8',
            '#F13EAF',
            '#F71FA7',
            '#FF00A1',
            '#E00890',
            '#C50E82',
            '#AD1374',
          ],
        },
        primaryColor: 'brand',
      }}
    >
      <AuthProvider>
        {/* <ToastContainer theme="colored" /> */}
        <Component {...pageProps} />
      </AuthProvider>
    </MantineProvider>
  )
}

export default MyApp
