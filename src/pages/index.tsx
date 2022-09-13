import * as React from 'react'
import type { NextPage } from 'next'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { useTranslation } from 'react-i18next'
import ToggleTheme from 'src/components/ToggleTheme'
import LanguageSelect from 'src/components/LanguageSelect'

const Home: NextPage = () => {
  const { t } = useTranslation('common')
  const { t: t1 } = useTranslation('index')

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 5,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" color="text.primary">
          {t('title')}
        </Typography>
        <p>1</p>
        <ToggleTheme />
        <LanguageSelect />
        <Typography component="h2" color="text.secondary">
          {t1('title')}
        </Typography>
      </Box>
    </Container>
  )
}

export default Home
