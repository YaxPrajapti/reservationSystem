import Hotel from '../models/Hotel.js';

//create hotel
export const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body); 
    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel)
    } catch (error) {
        next(error)
    }
}

//update hotel 
export const updateHotel = async (req, res, next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedHotel);
    } catch (error) {
        next(error)
    }
}

//delete hotel 
export const deleteHotel = async (req, res, next) => {
    try {
        await Hotel.findOneAndDelete(req.params.id);
        res.status(200).json("Property has been deleted");
    } catch (error) {
        next(error)
    }
}

//get hotel 
export const getHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        res.status(500).json(hotel);
    } catch (error) {
        next(error)
    }
}

//get all hotels 
export const getAllHotel = async (req, res, next) => {
    // const failed = true; 
    // if(failed) return next(createError(401, "You are not authenticated!"));
    try {
        const hotels = await Hotel.find(); 
        res.status(500).json(hotels);
    } catch (error) {
        next(error)
    }
}

