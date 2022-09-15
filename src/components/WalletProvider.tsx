import React, { PropsWithChildren, useState } from 'react'
import WalletConnect from '@walletconnect/client'
import { payloadId } from '@walletconnect/utils'

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
    const chainId = ChainInfo.chainId

    if (walletType === 'extension') {
      await window?.keplr?.experimentalSuggestChain(ChainInfo)
      await window?.keplr?.enable?.(chainId)
      const offlineSigner = window?.getOfflineSigner?.(chainId)
      const accounts = await offlineSigner?.getAccounts()
      setAddress(accounts?.[0].address)
      setLocalStorage(AUTO_CONNECT, 'extension')
    } else {
      // wallet-connect
      const connector = new WalletConnect({
        bridge: 'https://bridge.walletconnect.org', // Required
        qrcodeModal: {
          open: (uri: string) => {
            setIsConnecting(true)
            setWCUri(uri)
          },
          close: () => setWCUri(''),
        },
      })
      try {
        if (!connector.connected) {
          await connector.connect()
        }
        const { accounts } = await connector.sendCustomRequest({
          id: payloadId(),
          jsonrpc: '2.0',
          method: 'keplr_enable_wallet_connect_v1',
          params: [chainId],
        })
        setAddress(accounts?.[0])
        console.log('2')
      } catch (e: any) {
        console.log(e?.message)
        if (e?.message !== 'Session currently disconnected') {
          alert(e?.message)
        }
      }
      setIsConnecting(false)
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
