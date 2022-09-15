import React from 'react'
import Tooltip, { tooltipClasses, TooltipProps } from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'

const MyTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    // fontSize: 11,
    filter: 'drop-shadow(2px 2px 5px rgba(0, 0, 0, .15))',
    maxWidth: 900,
    borderRadius: '10px',
    marginTop: '26px !important',
    marginBottom: '26px !important',
    paddingTop: '0px',
    paddingBottom: '0px',
  },
  [`&	.${tooltipClasses.arrow}`]: {
    color: theme.palette.common.white,
    width: '30px',
    height: '20px',
    marginTop: '-20px !important',
    marginBottom: '-20px !important',
  },
}))
export default MyTooltip
