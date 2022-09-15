import {
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  Typography,
} from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import KeplrIcon from './KeplrIcon'
import WalletConnectIcon from './WalletConnectIcon'
import { useWalletManager, WalletType } from '../WalletProvider'

interface Props {
  open: boolean
  handleClose: VoidFunction
}

const WalletModal = ({ open, handleClose }: Props) => {
  const { t } = useTranslation('index')
  const { connect } = useWalletManager()

  const walletItems = [
    {
      id: 'extension',
      key: 'keplr extension',
      icon: <KeplrIcon />,
      title: t('Keplr  Wallet'),
      description: t('Keplr Browser Extension'),
    },
    {
      id: 'walletConnect',
      key: 'keplr mobile',
      icon: <WalletConnectIcon />,
      title: t('Wallet connect'),
      description: t('Keplr Mobile'),
    },
  ]

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
      open={open}
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
            mt: '6px',
            color: 'text.primary',
          }}
        >
          {t('Connect Wallet')}
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

      <DialogContent sx={{ p: 0, pt: '10px' }}>
        {walletItems.map((item) => (
          <Box
            key={item.key}
            sx={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#F3F6FC',
              borderRadius: '12px',
              p: '14px',
              mb: '14px',
              cursor: 'pointer',
              '&:last-child': {
                mb: 0,
              },
            }}
            onClick={() => {
              connect(item.id as WalletType)
              handleClose()
            }}
          >
            {item.icon}
            <Box sx={{ ml: '16px' }}>
              <Typography
                sx={{
                  fontWeight: 600,
                }}
              >
                {item.title}
              </Typography>
              <Typography
                sx={{
                  fontSize: '12px',
                  color: '#515D79',
                }}
              >
                {item.description}
              </Typography>
            </Box>
          </Box>
        ))}
      </DialogContent>
    </Dialog>
  )
}

export default WalletModal
