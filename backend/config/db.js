const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const MONGO_URI = process.env.MONGO_URI;
console.log(MONGO_URI);
const connectDB = async() => {
    try {
        const conn = await mongoose.connect(MONGO_URI);
        console.log(`Mongo DB connected:${conn.connection.host}`)
        
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB