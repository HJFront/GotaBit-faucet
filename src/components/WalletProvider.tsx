import React, { PropsWithChildren, useState } from 'react'
import { GotaBit } from 'gotabit'

import { useEagerConnect } from 'src/hooks/useEagerConnect'
import { AUTO_CONNECT, ChainInfo } from 'src/utils/constant'
import createContext from 'src/utils/createContext'
import { removeLocalStorage, setLocalStorage } from 'src/utils/localStorage'
import WalletConnectQRCodeModal from './Modals/WalletConnectQRCodeModal'

interface Props {}

export type WalletType = 'extension' | 'walletConnect'

export const [useWalletManager, WalletManagerProvider] = createContext<{
  connect: (walletType: WalletType) => void
  disconnect: VoidFunction
  address?: string
  isConnecting: boolean
}>('useWalletManager')

const WalletProvider = ({ children }: PropsWithChildren<Props>) => {
  const [address, setAddress] = useState<string>()
  const [wcUri, setWCUri] = useState('')
  const [isConnecting, setIsConnecting] = useState(false)

  const connect = async (walletType: WalletType) => {
    const chainId = 'test'

    if (walletType === 'extension') {
      const gotabit = await GotaBit.init(chainId, {
        type: 'keplr',
      })

      const [{ address }] = (await gotabit?.wallet?.getAccounts?.()) || [{}]

      setAddress(address)
      setLocalStorage(AUTO_CONNECT, 'extension')
    } else {
      // wallet-connect
      const gotabit = await GotaBit.init(chainId, {
        type: 'walletconnect',
        walletconnectParams: {
          signOpts: {
            logger: 'debug',
            relayUrl: 'wss://relay.gotabit.dev',
            projectId: '2c921904d8ebc91517cd11c1cc4a267f',
            metadata: {
              name: 'Gotabit SDK WalletConnect test',
              description: 'Gotabit SDK WalletConnect test',
              url: 'https://sdk.gotabit.dev',
              icons: [`https:\/\/res.gotabit.io\/svg\/icon.svg`],
            },
          },
        },
      })
      const [{ address }] = (await gotabit?.wallet?.getAccounts?.()) || [{}]

      setAddress(address)
    }
  }
  const disconnect = () => {
    removeLocalStorage(AUTO_CONNECT)
    setAddress(undefined)
  }

  useEagerConnect(connect)

  return (
    <WalletManagerProvider
      value={{
        connect,
        disconnect,
        address,
        isConnecting,
      }}
    >
      {children}
      <WalletConnectQRCodeModal
        isOpen={wcUri.length > 0}
        uri={wcUri}
        handleClose={() => {
          setWCUri('')
          setIsConnecting(false)
        }}
      />
    </WalletManagerProvider>
  )
}

export default WalletProvider
