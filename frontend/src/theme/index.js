import { createMuiTheme } from '@material-ui/core/styles'

const color = '#61DAFB'
const backgroundColor = '#282c34'

export default createMuiTheme({
  palette: {
    primary: {
      light: backgroundColor,
      main: color,
      dark: backgroundColor,
      contrastText: backgroundColor,
    },
    secondary: {
      light: backgroundColor,
      main: backgroundColor,
      dark: backgroundColor,
      contrastText: backgroundColor,
    },
  },
  overrides: {
    MuiButton: {
      root: {
        color: backgroundColor,
        border: `solid ${backgroundColor} 2px`,
        margin: '5px',
        backgroundColor: color,
        '&:hover': {
          color: color,
          backgroundColor: backgroundColor,
          border: `solid ${color} 2px`,
        },
      },
    },
    MuiInput: {
      input: {
        color: color, // if you also want to change the color of the input, this is the prop you'd use,
      },
      underline: {
        '&:before': {
          borderBottomColor: color,
        },
      },
    },
    MuiInputLabel: {
      root: {
        color: color,
      },
    },
    Link: {
      root: {
        backgroundColor: '#FFFFFF',
      },
    },
  },
})
