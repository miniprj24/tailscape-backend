const StoreAppointment = require('../model/storeAppointmentModel');

exports.createAppointment = async (req, res) => {
    try {
        const { petType, breed, date, time } = req.body;

        const appointment = new StoreAppointment({
            petType,
            breed,
            date,
            time,
        });

        await appointment.save();
        res.status(201).json({ message: 'Appointment created successfully', appointment });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getAllAppointments = async (req, res) => {
    try {
        const appointment = await StoreAppointment.find(); 
        res.status(200).json({ appointment });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteAppointment = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Appointment deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}
