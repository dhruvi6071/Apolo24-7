// models/Doctor.js
const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: String,
  specialization: String,
  experience: String,
  qualifications: String,
  location: String,
  clinic: String,
  fee: Number,
  cashback: Number,
  recommendation: String,
  patients : Number,
  gender: String,
  available_on : [String]
});

module.exports = mongoose.model('Doctor', doctorSchema);
