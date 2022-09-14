import { PaletteMode, ThemeOptions } from '@mui/material'

const getDesignTokens: (mode: PaletteMode) => ThemeOptions = (
  mode: PaletteMode
) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: {
            main: '#132F4C',
          },
          background: {
            default: '#fff',
          },
          text: {
            primary: '#0B1B42',
            secondary: 'rgba(11, 27, 66, 0.7)',
            info: '#198BFE',
          },
        }
      : {
          // palette values for dark mode
          primary: {
            main: '#F4F6F9',
          },
          background: {
            // default: deepOrange[900],
            // paper: deepOrange[900],
            default: '#030c14',
          },
          text: {
            primary: '#F4F6F9',
            secondary: '#5D6975',
          },
        }),
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1050,
      lg: 1328,
      xl: 1536,
    },
  },

  typography: {
    fontFamily: ['Poppins', '-apple-system', 'Arial', 'sans-serif'].join(','),
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
  },
})

export default getDesignTokens
