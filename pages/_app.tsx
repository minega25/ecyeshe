import { AppProps } from 'next/app'
import { AuthProvider } from 'src/auth/useAuth'
import { MantineProvider } from '@mantine/core'
import GlobalStyles from 'src/globalStyles'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import '@fullcalendar/common/main.css'
import '@fullcalendar/daygrid/main.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import '../src/styles/button.css'
import { TabsStateProvider } from 'src/context/useTabs'

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
        <TabsStateProvider>
          <GlobalStyles />
          <ToastContainer theme="colored" />
          <Component {...pageProps} />
        </TabsStateProvider>
      </AuthProvider>
    </MantineProvider>
  )
}

export default MyApp
