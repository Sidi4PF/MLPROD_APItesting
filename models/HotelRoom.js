const mongoose = require('mongoose');

// Connect to MongoDB Atlas
const dbURI = "mongodb+srv://sidiamadooubocoum:6IGYtrJgblg74BF2@cluster0.c1jje.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(dbURI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('Failed to connect to MongoDB:', err));

// Define a schema and model for Hotel Room
const hotelRoomSchema = new mongoose.Schema({
    roomNumber: { type: Number, required: true, unique: true },
    roomType: { type: String, required: true },
    pricePerNight: { type: Number, required: true },
    isBooked: { type: Boolean, default: false }
});

const HotelRoom = mongoose.model('HotelRoom', hotelRoomSchema);

module.exports = HotelRoom;
