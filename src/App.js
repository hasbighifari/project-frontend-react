import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Snackbar from './component/snackbar/Snackbar';

import DateFnsUtils from '@date-io/date-fns';

import NoAuthentication from '../src/router/NoAuthentication'
import Authentication from '../src/router/Authentication'
import { loginStatus } from './actions/userAction'

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: '#636FA4',
      contrastText: '#fff',
    },
    primary1: {
      contrastText: '#fff',
      main: '#0767DB',
      light: '#F6F9FD',
      dark: '#0B48A0'
    },
    secondary: {
      // main: '#ED2939',
      main: '#ED4740',
      contrastText: '#fff',
    },
    danger: {
      contrastText: 'white',
      main: '#ED4740',
      light: '#FEF6F6',
      dark: '#BF0E08'
    },
    success: {
      contrastText: 'white',
      main: '#45B880',
      light: '#F1FAF5',
      dark: '#00783E'
    },
    common: {
      black: '#000000',
      white: '#FFFFFF',
      neutral: '#E4E7EB',
      muted: '#9EA0A4'
    },
    text: {
      primary: '#12161B',
      secondary: '#66788A',
      disabled: '#A6B1BB'
    },
  },
  overrides: {
    MuiTooltip: {
      tooltip: {
        fontSize: "16px",
        fontFamily: 'sans-serif'
      }
    }

  }

});



const mapStateToProps = state => {
  console.log(state)
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => ({
  _setLoginStatus: val => {
    dispatch(loginStatus(val))
  }
})

function App({ ...props }) {
  const xAuthToken = localStorage.getItem('x-auth-token')
  if (xAuthToken) {
    return (
      <div>
        <MuiThemeProvider theme={theme}>
          {/* <NoAuthentication /> */}
          <Authentication />
          <Snackbar />
        </MuiThemeProvider>
      </div>
    );
  }
  else {
    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <NoAuthentication />
          {/* <Authentication /> */}
          <Snackbar />
        </MuiThemeProvider>
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
