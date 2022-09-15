import { Box, Container, Drawer, IconButton, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Link from 'src/Link'
import { formatAddress } from 'src/utils'
import AddressPopover from '../AddressPopover'
import GradientButton from '../Buttons/GradientButton'
import WalletModal from '../Modals/WalletModal'
import MyTooltip from '../MyTooltip'
import { useWalletManager } from '../WalletProvider'
import DrawerContent from './DrawerContent'
import Logo from './Logo'
import MenuIcon from './MenuIcon'
import WalletIcon from './WalletIcon'

const drawerWidth = '100%'
const container =
  typeof window !== undefined ? () => window.document.body : undefined

const NavBar = () => {
  const { t } = useTranslation('index')
  const { address, disconnect, isConnecting } = useWalletManager()
  const [modalOpen, setModalOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleClick = () => {
    if (address) return
    setModalOpen(true)
  }

  return (
    <Container>
      <Box
        sx={{
          width: '100%',
          py: ['16px', '16px', '28px'],
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mr: '20px',
            }}
          >
            <Box width={['98px', '98px', 'auto']} fontSize="0">
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
              display: ['none', 'none', 'flex'],
            }}
          >
            <Link
              color="text.primary"
              href="https://docs.hjcore.io/"
              target="_blank"
              rel="noopener"
              sx={{
                display: 'inline-flex',
                fontWeight: 600,
                fontSize: 18,
                alignItems: 'center',
                ml: '40px',
              }}
              underline="none"
            >
              {t('GotaBit')}
            </Link>
            <Link
              color="text.primary"
              href="https://docs.hjcore.io/"
              target="_blank"
              rel="noopener"
              sx={{
                display: 'inline-flex',
                fontWeight: 600,
                fontSize: 18,
                alignItems: 'center',
                ml: '40px',
              }}
              underline="none"
            >
              {t('Documentation')}
            </Link>
            <MyTooltip
              arrow
              title={
                (address && (
                  <AddressPopover address={address} disconnect={disconnect} />
                )) ||
                ''
              }
            >
              <GradientButton
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '48px',
                  px: '20px',
                  borderRadius: '24px',
                  fontWeight: 400,
                  fontSize: '16px',
                  ml: '40px',
                }}
                onClick={handleClick}
                loading={isConnecting}
              >
                <Box mr="10px" fontSize="0">
                  <WalletIcon />
                </Box>
                {address ? formatAddress(address) : t('Connect Wallet')}
              </GradientButton>
            </MyTooltip>
          </Box>
          <IconButton
            color="primary"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: ['block', 'block', 'none'], mr: '-8px', ml: '10px' }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Box>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          anchor="right"
          sx={{
            display: ['block', 'block', 'none'],
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
            backgroundColor: ['transparent'],
          }}
        >
          <DrawerContent onConnect={handleClick} onClose={handleDrawerToggle} />
        </Drawer>
      </Box>
      <WalletModal open={modalOpen} handleClose={() => setModalOpen(false)} />
    </Container>
  )
}

export default NavBar
