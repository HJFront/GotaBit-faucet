export const AUTO_CONNECT = 'account_auto_connect'

const prefix = 'gio'
export const ChainInfo = {
  chainId: 'gotabit-test-1',
  chainName: 'GotaBit-test',
  rpc: 'https://rpc-testnet.gotabit.dev:443',
  rest: 'https://rest-testnet.gotabit.dev:443',
  stakeCurrency: {
    coinDenom: 'GTB',
    coinMinimalDenom: 'ugtb',
    coinDecimals: 6,
    coinGeckoId: 'gotabit',
  },
  bip44: { coinType: 118 },
  bech32Config: {
    bech32PrefixAccAddr: prefix,
    bech32PrefixAccPub: prefix + 'pub',
    bech32PrefixValAddr: prefix + 'valoper',
    bech32PrefixValPub: prefix + 'valoperpub',
    bech32PrefixConsAddr: prefix + 'valcons',
    bech32PrefixConsPub: prefix + 'valconspub',
  },
  currencies: [
    {
      coinDenom: 'GTB',
      coinMinimalDenom: 'ugtb',
      coinDecimals: 6,
      coinGeckoId: 'gotabit',
    },
  ],
  feeCurrencies: [
    {
      coinDenom: 'GTB',
      coinMinimalDenom: 'ugtb',
      coinDecimals: 6,
      coinGeckoId: 'gotabit',
    },
  ],
  coinType: 118,
  gasPriceStep: { low: 0.001, average: 0.0025, high: 0.003 },
  features: ['ibc-transfer', 'cosmwasm', 'ibc-go'],
}
