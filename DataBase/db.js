const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://e-vehicle:e-vehicle@e-vehicle.7bhq06y.mongodb.net/e-vehicle?retryWrites=true&w=majority")

    console.log(`MongoDB Connected: ${conn.connection.host}`.green.underline)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = connectDB 