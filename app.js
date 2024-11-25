const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./router/authRoutes');
// const adminRoutes = require('./router/adminRoutes');

dotenv.config();
const app = express();

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
// app.use('/api/auth/admin', adminRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

module.exports = app;