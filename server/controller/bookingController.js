import Booking from '../model/Booking.js'
import User from '../model/Users.js'
import Notification from '../controller/notificationController.js'

export default class {
    static async getBookings(req, res) {
        const bookings = await Booking.find().populate('user')
        res.json(bookings)
    }
    static async findBooking(req, res) {
        const { id } = req.params
        try {
            const bookings = await Booking.find({ user: id }).populate(['user','hotel'])
            res.json(bookings)
        } catch (error) {
            res.status(400).json(error)
        }
    }
    static async createBooking(req, res) {
        const { start, end, amount, hotelID: hotel, tourID: tour, userID: user } = req.body;
        const booking = await Booking.create({
            start,
            end,
            amount,
            hotel,
            tour,
            user
        })
        const currentUser = await User.findById(user)
        Notification.createNotifications('BOOKING', `${currentUser.fname} made a reservation`, `Amount: ${amount}`)
        res.json(booking)
    }
    static async removeBooking(req, res) {
        const { id } = req.params
        const booking = await Booking.findByIdAndDelete(id)
        if (!booking) return res.status(404).json("Booking not found");
        res.json("record deleted")
    }
}