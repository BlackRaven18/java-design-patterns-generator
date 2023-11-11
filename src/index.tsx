import { ThemeProvider, createTheme } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import { store } from './redux/store';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

export const theme = createTheme({
  palette: {
    primary: {
      main: '#37382A',

    },
    secondary: {
      main: '#F9E79F'
    },
    action: {
      active: '#707B7C',
      hover: 'rgba(60, 61, 47, 0.55)',
    }
  },
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {

        }
      }
    }
  }
})

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        {/* <RouterProvider router={router} /> */}
        <App />

      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
