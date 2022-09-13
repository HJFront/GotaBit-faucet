import {
  Box,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const LanguageSelect = () => {
  const { i18n } = useTranslation()

  // fix the react-hydration-error
  // more details https://github.com/vercel/next.js/discussions/35773#discussioncomment-2622885
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const handleChange = (event: SelectChangeEvent) => {
    i18n.changeLanguage(event.target.value)
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <Select
          value={i18n.language || 'en'}
          label="Language"
          onChange={handleChange}
        >
          <MenuItem value="en">EN</MenuItem>
          <MenuItem value="zh">ZH</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}

export default LanguageSelect
