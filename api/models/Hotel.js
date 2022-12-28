import mongoose from "mongoose";
const {Schema} = mongoose; 

const HotelSchema = new Schema({
    name: {
        type: String,
        required: true,
    }, 
    propertyType: {
        type: String, 
        required: true
    }, 
    city: {
        type: String, 
        required: true
    }, 
    address: {
        type: String, 
        required: true
    }, 
    distance: {
        type: String, 
        required: true
    }, 
    photos: {
        type: [String], 
        required: false
    },
    title: {
        type: String, 
        required: true
    }, 
    description: {
        type: String, 
        required: true
    }, 
    rating: {
        type: Number, 
        required:false, 
        min: 0, 
        max: 5
    }, 
    rooms: {
        type: [String], 
        required: false
    },
    lowestPrice: {
        type: Number, 
        required: true
    },
    featured: {
        type: Boolean, 
        default: false 
    }
})

export default mongoose.model("Hotel", HotelSchema);