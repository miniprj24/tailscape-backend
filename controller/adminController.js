// const User = require('../model/userModel');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// // Admin login
// const adminLogin = async (req, res) => {
//     const { email, password } = req.body;

//     // Validate input
//     if (!email || !password) {
//         return res.status(400).json({ message: "Email and password are required" });
//     }

//     try {
//         // Check if the user exists
//         const admin = await User.findOne({ email, role: 'Admin' });
//         if (!admin) {
//             return res.status(401).json({ message: "Invalid admin credentials" });
//         }

//         // Compare passwords
//         const isMatch = await bcrypt.compare(password, admin.password);
//         if (!isMatch) {
//             return res.status(401).json({ message: "Invalid admin credentials" });
//         }

//         // Generate JWT token for admin
//         const token = jwt.sign(
//             { id: admin._id, role: admin.role },
//             process.env.JWT_SECRET,
//             { expiresIn: '2h' }
//         );

//         return res.status(200).json({
//             message: "Admin login successful",
//             role: admin.role,
//             token
//         });

//     } catch (error) {
//         console.error("Admin login error:", error);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// };

// module.exports = { adminLogin };