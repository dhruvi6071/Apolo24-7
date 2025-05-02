const express = require('express');
const router = express.Router();
const {addDoctor, listDoctorsWithFilter} = require('../controllers/doctorController');
const doctorController = require('../controllers/doctorController');

router.post('/add-doctor', addDoctor);
router.get('/list-doctor-with-filter', listDoctorsWithFilter);
router.get('/', doctorController.getAllDoctors);
module.exports = router;
