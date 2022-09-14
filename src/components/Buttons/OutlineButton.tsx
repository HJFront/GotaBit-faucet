import { Button, styled } from '@mui/material'

const OutlineButton = styled(Button)`
  ${({ theme }) => ({
    border: '1px solid',
    transition: `${theme.transitions.create(['opacity, shadow'], {
      duration: '1s',
    })}`,
    '&:hover': {
      opacity: 0.8,
      backgroundColor: theme.palette.background.default,
      boxShadow:
        '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
    },
  })}
`

export default OutlineButton
