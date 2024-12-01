const express = require('express');
const { createAppointment, getAllAppointments } = require('../controller/storeAppointmentController');

const router = express.Router();

router.get('/store-appointments', getAllAppointments);
router.post('/store-appointments', createAppointment);

module.exports = router;
