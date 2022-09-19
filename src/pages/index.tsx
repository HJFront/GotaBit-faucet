import React from 'react'
import type { NextPage } from 'next'
import NavBar from 'src/components/NavBar'
import MainForm from 'src/components/MainForm'
import { Container, Typography } from '@mui/material'
import Head from 'next/head'
import { useTranslation } from 'react-i18next'

import { perDayToken } from 'src/utils/perDayToken'

const Home: NextPage = () => {
  const { t } = useTranslation('index')

  return (
    <>
      <Head>
        <title>GotaBit Faucet</title>
      </Head>
      <NavBar />
      <Container maxWidth="lg">
        <MainForm />
        <Typography
          sx={{
            fontSize: ['10px', '14px'],
            textAlign: 'center',
            mx: 'auto',
            my: '40px',
            maxWidth: '540px',
            px: [0, 0, '20px'],
          }}
        >
          <Typography
            component="span"
            sx={{
              color: '#D9181B',
              mr: '4px',
              fontSize: 'inherit',
            }}
          >
            *
          </Typography>
          {t('perDayTokenDescription', {
            perDayToken,
          })}
        </Typography>
      </Container>
    </>
  )
}

export default Home
