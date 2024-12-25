const express = require('express');
const { createAppointment, getAllAppointments, deleteAppointment } = require('../controller/storeAppointmentController');

const router = express.Router();

router.get('/store-appointments', getAllAppointments);
router.post('/store-appointments', createAppointment);
router.delete('/delete-store-appointment/:id', deleteAppointment);

module.exports = router;
