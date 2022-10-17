import * as React from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider, EmotionCache } from '@emotion/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { GotabitProvider } from '@gotabit/react'
import { initializeConnectorWrapper } from '@gotabit/react'
import { KeplrWallet } from '@gotabit/wallet-keplr'
import { Walletconnect } from '@gotabit/wallet-walletconnect'

import createEmotionCache from '../createEmotionCache'
import InitTheme from '../components/InitTheme'
import InitI18n from '../components/InitI18n'
import WalletProvider from 'src/components/WalletProvider'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

const queryClient = new QueryClient()

export const [walletconnectConnector, walletconnectHooks] =
  initializeConnectorWrapper(() =>
    Walletconnect.init('test', {
      logger: 'debug',
      relayUrl: 'wss://relay.gotabit.dev',
      projectId: '2c921904d8ebc91517cd11c1cc4a267f',
      metadata: {
        name: 'Gotabit SDK WalletConnect test',
        description: 'Gotabit SDK WalletConnect test',
        url: 'https://sdk.gotabit.dev',
        icons: [`https:\/\/res.gotabit.io\/svg\/icon.svg`],
      },
    })
  )

export const [keplrConnector, keplrHooks] = initializeConnectorWrapper(() =>
  KeplrWallet.init('test')
)

export const { useAccount: useKeplrAccount, useActive: useKeplrActive } =
  keplrHooks

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  return (
    <InitI18n>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <InitTheme>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <QueryClientProvider client={queryClient}>
            <GotabitProvider>
              <WalletProvider>
                <Component {...pageProps} />
              </WalletProvider>
            </GotabitProvider>
          </QueryClientProvider>
        </InitTheme>
      </CacheProvider>
    </InitI18n>
  )
}
