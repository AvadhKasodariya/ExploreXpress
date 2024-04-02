import Tour from '../model/Tour.js'
import Booking from '../model/Booking.js'

export default class {
    static async getTours(req, res) {
        const tours = await Tour.find().populate('hotel')
        res.json(tours)
    }
    static async addTour(req, res) {
        try {
            const tour = await (await new Tour(req.body).save()).populate('hotel')
            res.json(tour)

        } catch (error) {
            res.status(400).json(error);
        }
    }
    static async editTour(req, res) {
        const { id } = req.params

        const tour = await Tour.findByIdAndUpdate(id, req.body, { new: true }).populate('hotel')
        if (!tour) return res.status(404).json("Tour not found");
        res.json(tour)
    }
    static async removeTour(req, res) {
        const { id } = req.params
        const tour = await Tour.findById(id)
        if (!tour) return res.status(404).json("Tour not found");
        tour.deleteOne()
        res.json("record deleted")
    }
    static async findTour(req, res) {
        const { destination, price, person, start, end } = req.body

        const toursQuery = Tour.find().populate({
            path: 'hotel',
            match: {
                city: { $regex: new RegExp(destination, 'i') },
                maxGroupSize: { $gte: person }
            }
        });

        if (price) {
            // toursQuery.populate({
            //     path: 'hotel',
            //     match: { cheapestprice: { $lte: price } }
            // });
            toursQuery.where('price').lte(price);
        }

        const tours = (await toursQuery.exec()).filter(tour => tour.hotel !== null);
        const response = await Promise.all(tours.map(async tour => {
            // Check if the tour is booked within the specified date range
            const _tour = tour.toObject()
            const bookings = await Booking.find({
                tour: tour._id,
                start: { $lte: end },
                end: { $gte: start }
            });

            // // If there are bookings for this tour within the specified date range,
            // // set booked = true; otherwise, set booked = false
            _tour.booked = bookings.length > 0;
            return _tour;

        }))
        res.json(response)

    }
}