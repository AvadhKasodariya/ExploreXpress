import { useLoadAuthSession } from './hook/auth'
import { useNotification } from './hook/notification'
import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import Protected from './routes/protected'
import Login from './pages/login'
import Dashboard from './pages/dashboard'
import Redirect from './routes/redirect'
import AppLayout from './layout/appLayout'
import User from './pages/user'
import Hotel from './pages/hotel'
import Booking from './pages/booking'
import Tour from './pages/tour'
import TourHotels from './pages/tourHotel'
import axios from 'axios'
import io from 'socket.io-client'

axios.defaults.baseURL = 'http://127.0.0.1:5000/api'
const socket = io('http://127.0.0.1:5000')

export default function App() {

  const loadSession = useLoadAuthSession()
  const { pushNotification, fetchNotification } = useNotification()
  useEffect(() => {
    loadSession()
    fetchNotification()

    socket.on('notification', (message) => {
      pushNotification(message)
    })

    return () => {
      socket.disconnect()
    }

  }, [])
  return <>
    <Routes>

      <Route Component={Redirect}>
        <Route path='/' Component={Login} />
      </Route>

      <Route Component={Protected}>
        <Route Component={AppLayout}>
          <Route path='/dashboard' Component={Dashboard} />
          <Route path='/user' Component={User} />
          <Route path='/hotel' Component={Hotel} />
          <Route path='/booking' Component={Booking} />
          <Route path='/tour' Component={Tour} />
          <Route path='/tour/:id' Component={TourHotels} />
        </Route>
      </Route>

      <Route path='*' element={<h1>404</h1>} />
    </Routes>
  </>
}
