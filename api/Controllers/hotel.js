import Hotel from "../Models/hotel.js"

export const createHotel = async(req, res, next) => {
    const newHotel = new Hotel(req.body);
  //let savedHotel; // Define savedHotel outside the try block

  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    next(error); // Use savedHotel here
  }
}

export const updateHotel = async(req, res, next) => {
    try {
        const updateHotel = await Hotel.findByIdAndUpdate(
          req.params.id, 
          { $set: req.body}, 
          { new: true});
        res.status(200).json(updateHotel);
      } catch (error) {
    next(error); // Use savedHotel here
  }
}

export const deleteHotel = async(req, res, next) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id);
         res.status(200).json("Hotel is deleted.");
       } catch (error) {
    next(error); // Use savedHotel here
  }
}

export const getHotel = async(req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel);
      } catch (error) {
    next(error); // Use savedHotel here
  }
}

export const getHotels = async(req, res, next) => {
    try {
        const hotels = await Hotel.find();
        res.status(200).json(hotels);
      } catch (error) {
    next(error); // Use savedHotel here
  }
}