const jwt = require('jsonwebtoken');
const User = require('../model/userModel');

const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '48h' }
    );
};

const signUp = async (req, res) => {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const newUser = new User({ name, email, password, role: role.toLowerCase() });
        await newUser.save();
        return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

const login = async (req, res) => {
    const { email, password, UIOrigin } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        if (user.role === 'admin' && UIOrigin !== 'admin' ) {
            return res.status(403).json({ message: "Admin login not allowed from user portal" });
        }

        if (user.role === 'user' && UIOrigin !== 'user' ) {
            return res.status(403).json({ message: "User login not allowed from admin portal" });
        }

        const token = generateToken(user);
        return res.status(200).json({
            message: "Login successful",
            id: user._id,
            name: user.name,
            email: user.email,
            token,
            role: (user.role).charAt(0).toUpperCase() + user.role.slice(1)
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { signUp, login };