import { loginValidation } from '../validations/auth.js'
import express from "express"
import Contact from "../model/contactModel.js"
import upload from "../middleware/fileupload.js"
import auth from "../middleware/auth.js"
import isAdmin from "../middleware/isAdmin.js"
import hotelController from "../controller/hotelController.js"
import userController from "../controller/userController.js"
import authController from "../controller/authController.js"
import bookingController from "../controller/bookingController.js"
import statsController from "../controller/statsController.js"
import notificationController from "../controller/notificationController.js"
import tourController from '../controller/tourController.js'

const route = express.Router()

route.post('/contact', (req, res) => {
    Contact.add(req.body)
    console.log(req.body);
    res.send(500)
})

route.post('/auth/login', loginValidation, authController.login)
route.post('/auth/register',authController.register)

route.get('/hotel', hotelController.getHotels)
route.get('/hotel/cities', hotelController.getHotelCities)
route.get('/hotel/:id', hotelController.getHotel)
route.get('/tour',tourController.getTours)
route.get('/tour/:id',tourController.getTourHotels)
route.delete('/tour/:tourID/:hotelID',tourController.removeTourHotel)
// route.post('/tour',tourController.findTour)
route.post('/search',hotelController.findHotels)

route.use(auth)

route.get('/mybooking/:id', bookingController.findBooking)
route.post('/booking', bookingController.createBooking)

route.use(isAdmin)

route.post('/upload', upload.array('photos', 3), hotelController)

route.get('/stats',statsController.getStats)

route.post('/hotel', upload.array('photos', 3), hotelController.addHotel)
route.post('/hotel/:id', upload.array('photos', 3), hotelController.editHotel)
route.delete('/hotel/:id', hotelController.removeHotel)

route.get('/user',userController.getUsers)
route.delete('/user/:id',userController.removeUser)

route.get('/booking',bookingController.getBookings)
route.delete('/booking/:id',bookingController.removeBooking)


route.get('/notification',notificationController.getNotifications)
route.post('/notification',notificationController.readNotifications)

route.post('/tour',tourController.addTour)
route.post('/tour/:id',tourController.editTour)
route.delete('/tour/:id',tourController.removeTour)
export default route