import { Box, Typography } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Form from './Form'

const MainForm = () => {
  const { t } = useTranslation('index')

  return (
    <Box
      sx={{
        mt: ['64px', '78px'],
      }}
    >
      <Typography
        component="h1"
        sx={{
          fontSize: ['40px', '60px'],
          textAlign: 'center',
          fontWeight: 600,
          mb: ['40px', '32px'],
        }}
      >
        {t('GotaBit Faucet')}
      </Typography>
      <Form />
    </Box>
  )
}

export default MainForm
