const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const doctorRoutes = require('./routes/doctorRoutes');

const app = express();

//Middleware
app.use(cors());
app.use(express.json());

//Routes
app.use('/api/doctors', doctorRoutes);

//connect to DB
mongoose.connect(process.env.MONGO_URI).then(() => app.listen(5000, () => console.log("Server is running on port 5000"))).catch(err => console.error(err));

module.exports = app;