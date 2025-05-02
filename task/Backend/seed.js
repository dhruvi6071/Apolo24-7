const mongoose = require('mongoose');
const Doctor = require('./models/Doctor');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await Doctor.deleteMany();  // Clear existing data
    const doctors = [
      { name: 'Dr. John Doe', specialty: 'General Physician', gender: 'male', rating: 4.5, available_on: ['2025-05-01'] },
      { name: 'Dr. Jane Smith', specialty: 'General Physician', gender: 'female', rating: 4.7, available_on: ['2025-05-02'] },
    ];
    await Doctor.insertMany(doctors);
    console.log('Seed data added');
    mongoose.disconnect();
  })
  .catch(err => console.log(err));
