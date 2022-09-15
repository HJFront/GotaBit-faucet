import React from 'react'
import { Dialog, Typography } from '@mui/material'
import { Box } from '@mui/system'
import QRCode from 'qrcode.react'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { useTranslation } from 'react-i18next'

interface Props {
  isOpen: boolean
  uri: string
  handleClose: VoidFunction
}

const WalletConnectQRCodeModal = ({ isOpen, uri, handleClose }: Props) => {
  const { t } = useTranslation('index')

  return (
    <Dialog
      sx={{
        '& .MuiDialog-paper': {
          maxWidth: ['334px', '350px'],
          minWidth: ['auto', '350px'],
          borderRadius: '14px',
          p: '24px',
        },
      }}
      open={isOpen}
      keepMounted
      onClose={handleClose}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontSize: ['17px', '20px'],
            fontWeight: 600,
            mb: '20px',
            color: 'text.primary',
          }}
        >
          {t('Scan QR Code')}
        </Typography>
        <Box
          sx={{
            color: '#0B84FF',
            fontSize: '26px',
            cursor: 'pointer',
          }}
        >
          <CloseRoundedIcon
            color="inherit"
            fontSize="inherit"
            onClick={handleClose}
          />
        </Box>
      </Box>
      {uri ? (
        <QRCode
          style={{ width: '100%', height: '100%' }}
          size={300}
          value={uri}
        />
      ) : undefined}
    </Dialog>
  )
}

export default WalletConnectQRCodeModal
