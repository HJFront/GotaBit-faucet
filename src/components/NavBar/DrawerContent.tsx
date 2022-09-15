import {
  AccordionSummary,
  Box,
  ClickAwayListener,
  Container,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import Logo from './Logo'
import { useTranslation } from 'react-i18next'
import { isMobile } from 'react-device-detect'

import Link from 'src/Link'
import GradientButton from '../Buttons/GradientButton'
import WalletIcon from './WalletIcon'
import { useWalletManager } from '../WalletProvider'
import { formatAddress } from 'src/utils'
import AddressPopover from '../AddressPopover'
import MyTooltip from '../MyTooltip'

interface Props {
  onClose: VoidFunction
  onConnect: VoidFunction
}

const DrawerContent = ({ onClose, onConnect }: Props) => {
  const { t } = useTranslation('index')
  const { address, disconnect } = useWalletManager()
  const [open, setOpen] = useState(false)

  const handleTooltipClose = () => {
    setOpen(false)
  }

  const handleTooltipOpen = () => {
    setOpen(!open)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '100%',
      }}
    >
      <Box>
        <Box
          sx={{
            width: '100%',
          }}
        >
          <Container
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              py: '16px',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                mr: '20px',
              }}
            >
              <Box width="98px" fontSize="0">
                <Logo />
              </Box>
              <Typography
                sx={{
                  px: '10px',
                  py: '2px',
                  backgroundColor: '#E4F0FC',
                  borderRadius: '8px',
                  ml: '8px',
                  fontWeight: 500,
                  fontSize: '12px',
                }}
              >
                {t('Faucet')}
              </Typography>
            </Box>
            <Box
              sx={{
                color: '#0B84FF',
                fontSize: '26px',
              }}
            >
              <CloseRoundedIcon
                color="inherit"
                fontSize="inherit"
                onClick={onClose}
              />
            </Box>
          </Container>
        </Box>

        <Box
          sx={{
            mt: '10px',
          }}
        >
          <AccordionSummary
            sx={{
              borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
              pb: '6px',
              pl: '20px',
            }}
          >
            <Link
              href="https://docs.hjcore.io/"
              target="_blank"
              rel="noopener"
              underline="none"
            >
              <Typography
                component="h2"
                sx={{ fontSize: '20px', fontWeight: 600 }}
              >
                {t('Get GID')}
              </Typography>
            </Link>
          </AccordionSummary>
          <AccordionSummary
            sx={{
              borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
              pb: '6px',
              pl: '20px',
            }}
          >
            <Link
              href="https://docs.hjcore.io/"
              target="_blank"
              rel="noopener"
              underline="none"
            >
              <Typography
                component="h2"
                sx={{ fontSize: '20px', fontWeight: 600 }}
              >
                {t('Documentation')}
              </Typography>
            </Link>
          </AccordionSummary>
        </Box>
      </Box>

      <ClickAwayListener onClickAway={handleTooltipClose}>
        <Box px="20px" pb="24px" onClick={handleTooltipOpen}>
          <MyTooltip
            arrow
            title={
              (address && (
                <AddressPopover address={address} disconnect={disconnect} />
              )) ||
              ''
            }
            onClose={handleTooltipClose}
            open={isMobile ? open : undefined}
            disableFocusListener={isMobile ? true : undefined}
            disableHoverListener={isMobile ? true : undefined}
            disableTouchListener={isMobile ? true : undefined}
          >
            <GradientButton
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '56px',
                borderRadius: '100px',
                fontWeight: 400,
                fontSize: '16px',
                width: '100%',
              }}
              onClick={onConnect}
            >
              <Box mr="10px" fontSize="0">
                <WalletIcon />
              </Box>
              {address ? formatAddress(address) : t('Connect Wallet')}
            </GradientButton>
          </MyTooltip>
        </Box>
      </ClickAwayListener>
    </Box>
  )
}

export default DrawerContent
