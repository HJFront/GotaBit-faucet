import React from 'react'
import type { NextPage } from 'next'
import NavBar from 'src/components/NavBar'
import MainForm from 'src/components/MainForm'
import { Container, Typography } from '@mui/material'
import Head from 'next/head'

const Home: NextPage = () => {
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
          Input your wallet address above to receive GTB for testing. Each
          wallet address can only receive 0.1 GTB for testing per day.
        </Typography>
      </Container>
    </>
  )
}

export default Home
