import { styled } from '@mui/material'
import { LoadingButton } from '@mui/lab'

const GradientButton = styled(LoadingButton)`
  ${({ theme }) => ({
    color: 'rgba(255, 255, 255, 1)',
    backgroundColor: 'rgba(0, 61, 217, 1)',
    backgroundImage:
      'linear-gradient(93.11deg, rgba(66, 162, 255, 1) 0%, rgba(11, 132, 255, 1) 100%)',
    transition: `${theme.transitions.create(['background, shadow'], {
      duration: '1s',
    })}`,
    '&:hover': {
      color: 'rgba(255, 255, 255, 0.8)',
      backgroundColor: 'rgba(0, 61, 217, 0.8)',
      boxShadow:
        '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
      backgroundImage:
        'linear-gradient(93.11deg, rgba(66, 162, 255, 0.8) 0%, rgba(11, 132, 255, 0.8) 100%)',
    },
  })}
`

export default GradientButton
