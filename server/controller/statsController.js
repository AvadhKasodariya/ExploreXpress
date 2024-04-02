import User from '../model/Users.js'
import Hotel from '../model/Hotel.js'
import Booking from '../model/Booking.js'
import Tour from '../model/Tour.js'


export default class {

    static async getStats(req, res) {
        const user = await User.count()
        const hotel = await Hotel.count()
        const booking = await Booking.count()
        const tour = await Tour.count()

        return res.json({ user, hotel, booking, tour })

    }
}