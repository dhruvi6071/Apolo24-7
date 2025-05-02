const Doctor = require('../models/Doctor');

//get doctor
// Node.js / Express controller example
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

