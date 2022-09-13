import { useTheme } from '@mui/material/styles'
import React from 'react'
import IconButton from '@mui/material/IconButton'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import Brightness2OutlinedIcon from '@mui/icons-material/Brightness2Outlined'

import { useColorMode } from './InitTheme'

const ToggleTheme = () => {
  const theme = useTheme()
  const { toggleColorMode } = useColorMode()

  return (
    <IconButton
      sx={{
        transform: 'rotate(150deg)',
      }}
      onClick={toggleColorMode}
      color="inherit"
    >
      {theme.palette.mode === 'dark' ? (
        <Brightness2OutlinedIcon />
      ) : (
        <LightModeOutlinedIcon />
      )}
    </IconButton>
  )
}

export default ToggleTheme
