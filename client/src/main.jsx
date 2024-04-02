import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Auth from './context/auth'
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
        <App />
      </Auth>
    </ChakraProvider>
  </BrowserRouter>,
)
