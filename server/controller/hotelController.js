import Hotel from '../model/Hotel.js'
import Booking from '../model/Booking.js'

export default class {
    static async addHotel(req, res) {
        try {
            const photos = req.files.map(file => file.filename)
            const hotel = await new Hotel({ ...req.body, photos }).save()
            res.json(hotel)

        } catch (error) {
            res.status(400).json(error);
        }
    }
    static async editHotel(req, res) {
        const { id } = req.params

        if (req.files?.length > 0) {
            req.body.photos = req.files.map(v => v.filename)
        }

        const hotel = await Hotel.findByIdAndUpdate(id, req.body, { new: true })
        if (!hotel) return res.status(404).json("Hotel not found");
        res.json(hotel)
    }
    static async removeHotel(req, res) {
        const { id } = req.params
        const hotel = await Hotel.findById(id)
        if (!hotel) return res.status(404).json("Hotel not found");
        hotel.deleteOne()
        res.json("record deleted")
    }
    static async getHotels(req, res) {
        const hotels = await Hotel.find()
        res.json(hotels)
    }
    static async getHotel(req, res) {
        try {
            const { id } = req.params
            const hotel = await Hotel.findById(id)

            if (hotel && hotel.photos?.length > 0) {
                hotel.photos = hotel.photos.map(photo => `http://127.0.0.1:${process.env.PORT}/${photo}`)
            }
            res.json(hotel)

        } catch (error) {
            res.status(400).json(error)
        }
    }

    static async getHotelCities(req, res) {
        const cities = await Hotel.aggregate([
            {
                $group: {
                    _id: { $toLower: "$city" }, // Field to group by
                    total: { $sum: 1 }, // Count of documents in each group
                    
                }
            },
            {
                $project:{
                    _id: false,
                    city: '$_id'
                }
            }
        ]);

        res.json(cities)
    }

    static async findHotels(req, res) {
        const { destination, price, person, start, end } = req.body
        const query = { city: { $regex: new RegExp(destination, 'i') }, maxGroupSize: { $gte: person } }
        if (price)
            query.cheapestprice = { $lte: price }
        const hotels = await Hotel.find(query)

        const response = await Promise.all(hotels.map(async hotel => {
            const booking = await Booking.find({
                hotel: hotel._id,
                start: { $lte: end },
                end: { $gte: start }
            })
            hotel.booked = booking.length > 0
            hotel.photos = hotel.photos.map(photo=>`http://127.0.0.1:5000/${photo}`)
            return hotel
        }))

        res.json(response)
    }
}