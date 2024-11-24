const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index'); 
const HotelRoom = require('../models/HotelRoom'); // Adjust the path to your Mongoose model

// Connect to MongoDB Atlas before running tests
beforeAll(async () => {
    const dbURI = "mongodb+srv://sidiamadooubocoum:6IGYtrJgblg74BF2@cluster0.c1jje.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    await mongoose.connect(dbURI);
    await HotelRoom.deleteMany(); // Ensure the database is empty before starting tests
});

// Setup: Insert specific rooms into the database before each test
beforeEach(async () => {
    await HotelRoom.create([
        { roomNumber: 101, roomType: 'Single', pricePerNight: 100, isBooked: false },
        { roomNumber: 102, roomType: 'Double', pricePerNight: 150, isBooked: false },
    ]);
});

// Teardown: Clear the database after each test
afterEach(async () => {
    await HotelRoom.deleteMany();
});

// Disconnect from the database after all tests
afterAll(async () => {
    await mongoose.connection.close();
});

describe('Hotel Room API Tests', () => {

    // Test: Happy path (Creating a new room)
    it('should create a new room (happy path)', async () => {
        const response = await request(app)
            .post('/rooms')
            .send({
                roomNumber: 103, roomType: 'Suite', pricePerNight: 200, isBooked: false
            });

        expect(response.status).toBe(201); // Expect 201 for successful creation
        expect(response.body.roomNumber).toBe(103); // Validate room number in the response
    });

    // Test: Room creation with wrong information
    it("should return 400 when creating a room with wrong info", async () => {
        const response = await request(app)
            .post('/rooms')
            .send({
                roomNumber: "number here", // Invalid room number type
                roomType: 123, // Invalid room type
                pricePerNight: 200, // Invalid price type (should be a number)
                isBooked: false
            });

        expect(response.status).toBe(400); // Expect 400 for bad request
    });

    // Test: Unhappy path (Trying to create a room with an existing room number)
    it('should return 400 when roomNumber already exists in DB (unhappy path)', async () => {
        const response = await request(app)
            .post('/rooms')
            .send({
                roomNumber: 102, // Room number already exists
                roomType: 'Suite',
                pricePerNight: 200,
                isBooked: false
            });

        expect(response.status).toBe(400); // Expect 400 for duplicate room number
        expect(response.body.message).toBe('Room number already exists'); // Error message
    });
});
