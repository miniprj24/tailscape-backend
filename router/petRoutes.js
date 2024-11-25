const express = require('express');
const { getAllPets } = require('../controller/petController');

const router = express.Router();

router.get('/', getAllPets);

module.exports = router;