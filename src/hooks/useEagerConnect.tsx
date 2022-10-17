import { useEffect } from 'react'
import { WalletType } from 'src/components/WalletProvider'
import { AUTO_CONNECT } from 'src/utils/constant'
import { getLocalStorage } from 'src/utils/localStorage'

export const useEagerConnect = (connect: (walletType: WalletType) => void) => {
  useEffect(() => {
    const walletType = getLocalStorage(AUTO_CONNECT)
    if (walletType === 'extension') {
      connect(walletType as WalletType)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
