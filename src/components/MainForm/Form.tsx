import { Box, MenuItem, Select, TextField } from '@mui/material'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import ReCAPTCHA from 'react-google-recaptcha'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

import GradientButton from '../Buttons/GradientButton'
import InfoModal from '../Modals/InfoModal'
import SuccessModal from '../Modals/SuccessModal'

const CAPTCHA_KEY = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'

interface Params {
  denom: string
  address: string
}

const myHelper: any = {
  address: {
    required: 'Address is required',
  },
}

const Form = () => {
  const { t } = useTranslation('index')

  const [successOpen, setSuccessOpen] = useState(false)
  const [infoOpen, setInfoOpen] = useState(false)
  const [message, setMessage] = useState('')

  const { control, handleSubmit, reset } = useForm({
    reValidateMode: 'onChange',
    defaultValues: {
      denom: 'one',
      address: '',
    },
  })

  const options = [
    { id: 'one', label: 'One' },
    { id: 'two', label: 'Two' },
    { id: 'three', label: 'Three' },
  ]

  const handleOnSubmit = (event: Params) => {
    console.log(event)
  }

  const handleOnChange = (value: string | null) => {
    console.log('Captcha value:', value)
    // if value is null recaptcha expired
    if (value === null) {
      // this.setState({ expired: 'true' })
    }
  }

  return (
    <Box
      sx={{
        position: 'relative',
      }}
    >
      <Box
        sx={{
          maxWidth: '662px',
          mx: 'auto',
          backgroundColor: 'background.default',
          borderRadius: '24px',
          boxShadow: '0px 7px 100px -20px rgba(26, 56, 83, 0.1)',
          border: '1px solid rgba(0, 61, 217, 0.1)',
          p: ['40px 20px 36px', '50px 40px 40px'],
        }}
        component="form"
        onSubmit={handleSubmit(handleOnSubmit)}
      >
        <Controller
          control={control}
          name="denom"
          render={({ field }) => (
            <Select
              {...field}
              fullWidth
              MenuProps={{
                sx: {
                  '.MuiMenu-paper': {
                    backgroundColor: 'background.default',
                    border: '1px solid rgba(0, 61, 217, 0.1)',
                    boxShadow: '0px 7px 100px -20px rgba(26, 56, 83, 0.1)',
                    borderRadius: '24px',
                    py: '10px',
                  },
                },
              }}
              IconComponent={(props) => (
                <KeyboardArrowDownIcon
                  {...props}
                  sx={{
                    mr: '30px',
                  }}
                />
              )}
              sx={{
                fontWeight: 500,
                '&.MuiInputBase-root': {
                  background:
                    'linear-gradient(0deg, #F5F7FD, #F5F7FD), rgba(0, 61, 217, 0.08)',
                  borderRadius: '100px',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  display: 'none',
                },
                '& .MuiInputBase-input': {
                  px: '30px',
                },
              }}
            >
              {options.map((item) => (
                <MenuItem
                  value={item.id}
                  key={item.id}
                  sx={{
                    py: '10px',
                    fontWeight: 500,
                    '&.Mui-selected': {
                      backgroundColor: '#F5F7FD !important',
                      color: 'text.info',
                    },
                  }}
                >
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        <Controller
          control={control}
          name="address"
          rules={{
            required: true,
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              fullWidth
              placeholder={t('GotaBit Address')}
              variant="outlined"
              error={error !== undefined}
              helperText={error ? myHelper.address[error?.type] : ''}
              sx={{
                mt: ['14px', '20px'],
                fontWeight: 500,
                '& .MuiInputBase-root': {
                  background:
                    'linear-gradient(0deg, #F5F7FD, #F5F7FD), rgba(0, 61, 217, 0.08)',
                  borderRadius: '100px',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  display: 'none',
                },
                '& .MuiInputBase-input': {
                  px: '30px',
                },
              }}
            />
          )}
        />
        <GradientButton
          fullWidth
          sx={{
            display: 'block',
            p: '16px',
            borderRadius: '100px',
            mt: '36px',
            mb: '40px',
          }}
          type="submit"
        >
          {t('Get Test Coins')}
        </GradientButton>
        <Box
          sx={{
            textAlign: 'center',
            fontSize: 0,
          }}
        >
          <ReCAPTCHA
            style={{ display: 'inline-block' }}
            sitekey={CAPTCHA_KEY}
            onChange={handleOnChange}
          />
        </Box>
      </Box>

      <SuccessModal
        open={successOpen}
        handleClose={() => setSuccessOpen(false)}
      />
      <InfoModal
        open={infoOpen}
        handleClose={() => setInfoOpen(false)}
        message={message}
      />
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '120%',
          background: '#003DD9',
          opacity: ['0.2', '0.1'],
          filter: 'blur(250px)',
          zIndex: -1,
          pointerEvents: 'none',
        }}
      ></Box>
    </Box>
  )
}

export default Form
