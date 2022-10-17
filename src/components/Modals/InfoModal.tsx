import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  Typography,
} from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'

import GradientButton from '../Buttons/GradientButton'
import InfoIcon from './InfoIcon'
import OutlineButton from '../Buttons/OutlineButton'

interface Props {
  message: string
  open: boolean
  handleClose: VoidFunction
}

const InfoModal = ({ message, open, handleClose }: Props) => {
  const { t } = useTranslation('index')

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
        <InfoIcon />
      </Box>
      <DialogContent>
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
            {t('Address is cool')}
          </Typography>
          <Typography
            sx={{
              wordBreak: 'break-all',
              fontSize: '12px',
            }}
          >
            {message}
          </Typography>
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
          {t('Cancel')}
        </OutlineButton>
        {/* <GradientButton
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
        </GradientButton> */}
      </Box>
    </Dialog>
  )
}

export default InfoModal
