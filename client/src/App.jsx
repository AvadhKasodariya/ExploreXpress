import { useLoadAuthSession } from './hook/auth'
import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import Protected from './routes/protected'
import Redirect from './routes/redirect'
import axios from 'axios'
import Home from './pages/home'
import Hotels from './pages/hotels'
import Search from './pages/search'
import Details from './pages/details'
import Login from './pages/login'
import Checkout from './pages/checkout'
import Thankyou from './pages/thankyou'
import MyBookings from './pages/mybookings'
import Register from './pages/register'

axios.defaults.baseURL = 'http://127.0.0.1:5000/api'

export default function App() {

  const loadSession = useLoadAuthSession()
  useEffect(() => {
    loadSession()

  }, [])
  return <>
    <Routes>

      <Route Component={Redirect}>
        <Route path='/login' Component={Login} />
        <Route path='/register' Component={Register} />
      </Route>
      <Route Component={Protected}>
        <Route path='/checkout/:id' Component={Checkout} />
        <Route path='/thankyou' Component={Thankyou} />
        <Route path='/mybookings' Component={MyBookings} />
      </Route>

      <Route path='/' Component={Home} />
      <Route path='/hotels' Component={Hotels} />
      <Route path='/search' Component={Search} />
      <Route path='/details/:id' Component={Details} />

      <Route path='*' element={<h1>404</h1>} />
    </Routes>
  </>
}
