const Doctor = require('../models/Doctor');

//get doctor
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching doctors' });
  }
};


// Add doctor
exports.addDoctor = async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.status(201).json(doctor);
  } catch (error) {
    res.status(500).json({ error: 'Error adding doctor' });
  }
};

// List doctors with filter + pagination
// controllers/doctorController.js
exports.listDoctorsWithFilter = async (req, res) => {
  try {
    const {
      specialization,
      minRating,
      maxFee,
      gender,
      availability,
      page = 1,
      limit = 20,
    } = req.query;

    const query = {};

    // Handle filters only if values are passed
    if (specialization) query.specialization = specialization;
    if (minRating) query.rating = { $gte: Number(minRating) };
    if (maxFee) query.fee = { $lte: Number(maxFee) };
    if (gender) query.gender = new RegExp(`^${gender}$`, "i"); // case-insensitive exact match
    if (availability)
      query.available_on = { $in: [availability] }; // match array elements

    const doctors = await Doctor.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json(doctors);
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res.status(500).json({ error: "Error fetching doctors" });
  }
};

