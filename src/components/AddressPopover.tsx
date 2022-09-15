import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useTranslation } from 'react-i18next'
import GradientButton from './Buttons/GradientButton'
import OutlineButton from './Buttons/OutlineButton'

interface Props {
  address: string
  disconnect: VoidFunction
}

const AddressPopover = ({ address, disconnect }: Props) => {
  const { t } = useTranslation('index')

  return (
    <Box
      sx={{
        maxWidth: '300px',
        p: '30px',
      }}
    >
      <Typography
        sx={{
          fontSize: '12px',
          fontWeight: 500,
          mb: '14px',
        }}
      >
        {address}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <OutlineButton
          onClick={disconnect}
          sx={{
            borderRadius: '100px',
            px: '24px',
            height: '38px',
            fontWeight: 500,
            color: '#0E86FF',
          }}
          disableElevation
        >
          {t('Cutover')}
        </OutlineButton>
        <GradientButton
          onClick={(e) => {
            e.preventDefault()
            disconnect()
          }}
          sx={{
            borderRadius: '100px',
            px: '24px',
            height: '38px',
            fontWeight: 500,
            ml: '14px',
          }}
          disableElevation
        >
          {t('Disconnect')}
        </GradientButton>
      </Box>
    </Box>
  )
}

export default AddressPopover
