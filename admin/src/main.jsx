import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Auth from './context/auth'
import Notification from './context/notification'
import './index.css'

const theme = extendTheme({
  colors: {
    primary: "#424953",
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ChakraProvider theme={theme}>
      <Auth>
        <Notification>
          <App />
        </Notification>
      </Auth>
    </ChakraProvider>
  </BrowserRouter>,
)
