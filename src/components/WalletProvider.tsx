import React, { PropsWithChildren, useState } from 'react'
import { useEagerConnect } from 'src/hooks/useEagerConnect'
import { AUTO_CONNECT, ChainInfo } from 'src/utils/constant'
import createContext from 'src/utils/createContext'
import { removeLocalStorage, setLocalStorage } from 'src/utils/localStorage'

interface Props {}

export const [useWalletManager, WalletManagerProvider] = createContext<{
  connect: VoidFunction
  disconnect: VoidFunction
  address?: string
}>('useWalletManager')

const WalletProvider = ({ children }: PropsWithChildren<Props>) => {
  const [address, setAddress] = useState<string>()

  const connect = async () => {
    const chainId = ChainInfo.chainId
    await window?.keplr?.experimentalSuggestChain(ChainInfo)
    await window?.keplr?.enable?.(chainId)
    const offlineSigner = window?.getOfflineSigner?.(chainId)
    const accounts = await offlineSigner?.getAccounts()
    setAddress(accounts?.[0].address)
    setLocalStorage(AUTO_CONNECT, 'extension')
    // wallet-connect
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
      }}
    >
      {children}
    </WalletManagerProvider>
  )
}

export default WalletProvider
