import { AUTO_CONNECT } from 'src/utils/constant'
import { getLocalStorage } from 'src/utils/localStorage'

export const useEagerConnect = (connect: VoidFunction) => {
  const walletType = getLocalStorage(AUTO_CONNECT)
  if (walletType === 'extension') {
    connect()
  }
}
