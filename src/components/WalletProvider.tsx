import React, { PropsWithChildren, useEffect, useState } from 'react'

import { useEagerConnect } from 'src/hooks/useEagerConnect'
import { AUTO_CONNECT, ChainInfo } from 'src/utils/constant'
import createContext from 'src/utils/createContext'
import { removeLocalStorage, setLocalStorage } from 'src/utils/localStorage'
import WalletConnectQRCodeModal from './Modals/WalletConnectQRCodeModal'
import {
  keplrConnector,
  useKeplrAccount,
  useKeplrActive,
  walletconnectConnector,
} from 'src/pages/_app'

interface Props {}

export type WalletType = 'extension' | 'walletConnect'

export const [useWalletManager, WalletManagerProvider] = createContext<{
  connect: (walletType: WalletType) => void
  disconnect: VoidFunction
  address?: string
  isConnecting: boolean
}>('useWalletManager')

const WalletProvider = ({ children }: PropsWithChildren<Props>) => {
  const active = useKeplrActive()
  const account = useKeplrAccount()

  const [address, setAddress] = useState<string>()
  const [wcUri, setWCUri] = useState('')
  const [isConnecting, setIsConnecting] = useState(false)
  const [connector, setConnector] = useState<
    | Awaited<ReturnType<typeof keplrConnector>>
    | Awaited<ReturnType<typeof walletconnectConnector>>
    | null
  >()

  const connect = async (walletType: WalletType) => {
    const chainId = 'test'

    if (walletType === 'extension') {
      const _connector = await keplrConnector()
      setConnector(_connector)
      setLocalStorage(AUTO_CONNECT, 'extension')
    } else {
      // wallet-connect
      const _connector = await walletconnectConnector()
      setConnector(_connector)
    }
  }

  const disconnect = () => {
    removeLocalStorage(AUTO_CONNECT)
    setAddress(undefined)
    connector?.disconnect()
    setConnector(null)
  }

  useEagerConnect(connect)

  useEffect(() => {
    if (active) {
      setAddress(account)
    }
  }, [active, account])

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
