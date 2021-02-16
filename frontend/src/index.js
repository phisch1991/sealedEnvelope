import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#282c34',
      main: '#61DAFB',
      dark: '#282c34',
      contrastText: '#282c34',
    },
    secondary: {
      light: '#282c34',
      main: '#61DAFB',
      dark: '#282c34',
      contrastText: '#282c34',
    },
  },
});


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <MuiThemeProvider theme={theme}>
      <App />
      </MuiThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


