import { PaletteMode } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import React, { PropsWithChildren, useEffect, useMemo, useState } from 'react'
import getDesignTokens from '../theme'
import createContext from '../utils/createContext'
import { getLocalStorage, setLocalStorage } from '../utils/localStorage'

export const [useColorMode, ColorModeProvider] = createContext<{
  toggleColorMode: () => void
}>('colorMode')

const InitTheme = ({ children }: PropsWithChildren<{}>) => {
  const defalutMode = getLocalStorage('mode') ?? 'light'
  const [mode, setMode] = useState<PaletteMode>()
  useEffect(() => {
    setMode(defalutMode as PaletteMode)
  }, [defalutMode])
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const mode = prevMode === 'light' ? 'dark' : 'light'
          setLocalStorage('mode', mode)
          return mode
        })
      },
    }),
    []
  )

  const theme = useMemo(
    () => createTheme(getDesignTokens(mode as PaletteMode)),
    [mode]
  )

  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <ColorModeProvider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeProvider>
  )
}

export default InitTheme
