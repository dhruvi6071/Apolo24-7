const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const Doctor = require('./models/Doctor');


dotenv.config();
const doctorRoutes = require('./routes/doctorRoutes');

const app = express();

//Middleware
app.use(cors());
app.use(express.json());

//Routes
app.use('/api/doctor', doctorRoutes);

app.get('/api/doctors/list-doctor-with-filter', async (req, res) => {
  const { gender, availability, page = 1 } = req.query;

  const filter = {};
  if (gender) filter.gender = gender;
  if (availability) filter.available_on = availability;

  const limit = 10;
  const skip = (page - 1) * limit;

  try {
    const doctors = await Doctor.find(filter).skip(skip).limit(limit);
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch doctors." });
  }
});

//connect to DB
mongoose.connect(process.env.MONGO_URI).then(() => app.listen(process.env.PORT || 5000, () => console.log("Server is running on port 5000"))).catch(err => console.error(err));

module.exports = app;