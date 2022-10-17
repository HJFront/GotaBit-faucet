import { Box, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { useMutation } from 'react-query'
import axios from 'axios'
import HCaptcha from '@hcaptcha/react-hcaptcha'

import GradientButton from '../Buttons/GradientButton'
import InfoModal from '../Modals/InfoModal'
import SuccessModal from '../Modals/SuccessModal'
import { useWalletManager } from '../WalletProvider'

const CAPTCHA_KEY = '3e84a635-42cd-4f1e-b5e1-4abb6698380c'
interface Params {
  denom: string
  address: string
}
interface Variables {
  'h-captcha-response': string
  service: string
  payload: Params
}

const myHelper: any = {
  address: {
    required: 'Please input the recipient address!',
  },
}

const options = [{ id: 'ugtb', label: 'UGTB' }]

const Form = () => {
  const { t } = useTranslation('index')
  const { address } = useWalletManager()

  const [successOpen, setSuccessOpen] = useState(false)
  const [infoOpen, setInfoOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [userAddress, setUserAddress] = useState('')
  const [captchaValue, setCaptchaValue] = useState<string | null>(null)
  const [captchaError, setCaptchaError] = useState<string | null>(null)

  const captchaRef: any = useRef(null)
  const captchaErrorTip = t('Please tick the CAPTCHA!')
  const defaultValues = useMemo(
    () => ({
      denom: 'ugtb',
      address: address || '',
    }),
    [address]
  )

  useEffect(() => {
    captchaValue && setCaptchaError(null)
  }, [captchaValue])

  const { control, handleSubmit, reset } = useForm({
    reValidateMode: 'onChange',
    defaultValues,
  })

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])

  const { isLoading, mutate } = useMutation(
    (data: Variables) => axios.post('https://hcaptcha.gotabit.io/', data),
    {
      onSuccess({ data }) {
        if (data?.code === 200) {
          setSuccessOpen(true)
        } else {
          setInfoOpen(true)
          setMessage(data?.message)
        }
        setCaptchaValue(null)
        captchaRef?.current?.resetCaptcha()
      },
      onError(error: any) {
        setInfoOpen(true)
        setMessage(error?.response?.data.error)
        setCaptchaValue(null)
        captchaRef?.current?.resetCaptcha()
      },
    }
  )

  const handleOnSubmit = (data: Params) => {
    if (!captchaValue) {
      setCaptchaError(t(captchaErrorTip))
      return
    }

    const variables = {
      'h-captcha-response': captchaValue,
      service: 'faucet',
      payload: data,
    }

    mutate(variables)
    setUserAddress(data.address)
  }

  const handleVerify = (token: string, ekey: string) => {
    setCaptchaValue(token)
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
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault()
          if (!captchaValue) {
            setCaptchaError(t(captchaErrorTip))
          }

          handleSubmit(handleOnSubmit)()
        }}
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
          loading={isLoading}
        >
          {t('Get Test Coins')}
        </GradientButton>
        <Box
          sx={{
            textAlign: 'center',
            fontSize: 0,
          }}
        >
          <HCaptcha
            sitekey={CAPTCHA_KEY}
            onVerify={handleVerify}
            onExpire={() => setCaptchaValue(t('Token expired!'))}
            ref={captchaRef}
          />
          {captchaError && (
            <Typography
              sx={{
                color: '#d32f2f',
                fontSize: '0.75rem',
                textAlign: 'left',
                mt: '3px',
                mx: '14px',
              }}
            >
              {captchaError}
            </Typography>
          )}
        </Box>
      </Box>

      <SuccessModal
        address={userAddress}
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
