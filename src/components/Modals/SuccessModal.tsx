import {
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  Typography,
} from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import copy from 'copy-to-clipboard'

import GradientButton from '../Buttons/GradientButton'
import CopyIcon from './CopyIcon'
import SuccessIcon from './SuccessIcon'
import OutlineButton from '../Buttons/OutlineButton'

interface Props {
  address: string
  open: boolean
  handleClose: VoidFunction
}

const SuccessModal = ({ open, handleClose, address }: Props) => {
  const { t } = useTranslation('index')
  const [showTip, setShowTip] = useState(false)

  const handleCopy = () => {
    const result = copy(address)
    if (result) {
      console.log('Success')
      setShowTip(true)
    } else {
      console.error('Failed to copy')
    }
  }

  useEffect(() => {
    showTip && setTimeout(() => setShowTip(false), 1300)
  }, [showTip])

  return (
    <Dialog
      sx={{
        '& .MuiDialog-paper': {
          maxWidth: ['334px', '350px'],
          minWidth: ['auto', '350px'],
          borderRadius: '14px',
          px: '28px',
          pt: '40px',
          pb: '50px',
        },
      }}
      open={open}
      keepMounted
      onClose={handleClose}
    >
      <Box
        sx={{
          position: 'absolute',
          right: '24px',
          top: '24px',
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
      <Box
        sx={{
          mx: 'auto',
          fontSize: 0,
        }}
      >
        <SuccessIcon />
      </Box>
      <DialogContent
        sx={{
          pt: '20px',
          px: 0,
        }}
      >
        <DialogContentText component="div" textAlign="center">
          <Typography
            variant="h4"
            sx={{
              fontSize: ['17px', '20px'],
              fontWeight: 600,
              mb: '14px',
              color: 'text.primary',
            }}
          >
            {t('Transaction has been sent')}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              backgroundColor: '#F5F7FD',
              borderRadius: '24px',
              px: '14px',
              height: '40px',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Typography
              sx={{
                fontSize: '10px',
                flex: 1,
                color: 'rgba(11, 27, 66, 0.7)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {address}
            </Typography>
            <Box
              sx={{
                ml: '8px',
                fontSize: 0,
                cursor: 'pointer',
              }}
              onClick={handleCopy}
            >
              <CopyIcon />
            </Box>
          </Box>
        </DialogContentText>
      </DialogContent>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <OutlineButton
          onClick={handleClose}
          disableElevation
          sx={{
            borderRadius: '100px',
            px: '24px',
            height: '44px',
            fontWeight: 500,
            color: '#0E86FF',
          }}
        >
          {t('Check')}
        </OutlineButton>
        <GradientButton
          onClick={handleClose}
          sx={{
            borderRadius: '100px',
            px: '24px',
            height: '44px',
            fontWeight: 500,
            ml: '14px',
          }}
          disableElevation
        >
          {t('Definite')}
        </GradientButton>
      </Box>
      {showTip && (
        <Typography
          sx={{
            position: 'fixed',
            top: '46%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            px: '20px',
            py: '10px',
            backgroundColor: 'rgba(0,0,0,0.7)',
            borderRadius: '50px',
            color: '#fff',
          }}
        >
          {t('Copied!')}
        </Typography>
      )}
    </Dialog>
  )
}

export default SuccessModal
