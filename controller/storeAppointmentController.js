const StoreAppointment = require('../model/storeAppointmentModel');

// Create a new appointment
exports.createAppointment = async (req, res) => {
    try {
        const { petType, breed, date, time, userId } = req.body;

        if (!petType || !breed || !date || !time || !userId) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newAppointment = new StoreAppointment({
            userId,
            petType,
            breed,
            date,
            time,
        });

        const savedAppointment = await newAppointment.save();
        res.status(201).json({ message: 'Appointment created successfully', appointment: savedAppointment });
    } catch (err) {
        console.error('Error creating appointment:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all appointments
exports.getAllAppointments = async (req, res) => {
    try {
        const appointments = await StoreAppointment.find();
        res.status(200).json({ appointments });
    } catch (err) {
        console.error('Error fetching appointments:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get appointments for a specific user
exports.getAppointmentsByUser = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const userAppointments = await StoreAppointment.find({ userId });

        if (userAppointments.length === 0) {
            return res.status(404).json({ message: 'No appointments found for this user' });
        }

        res.status(200).json({ appointments: userAppointments });
    } catch (err) {
        console.error('Error fetching user appointments:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete an appointment by ID
exports.deleteAppointment = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedAppointment = await StoreAppointment.findByIdAndDelete(id);

        if (!deletedAppointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        res.status(200).json({ message: 'Appointment deleted successfully' });
    } catch (err) {
        console.error('Error deleting appointment:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update an appointment's status
exports.updateAppointmentStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!status || !['pending', 'approved', 'denied'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status value' });
        }

        const updatedAppointment = await StoreAppointment.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updatedAppointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        res.status(200).json({ message: 'Appointment status updated successfully', appointment: updatedAppointment });
    } catch (err) {
        console.error('Error updating appointment status:', err.message);
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
