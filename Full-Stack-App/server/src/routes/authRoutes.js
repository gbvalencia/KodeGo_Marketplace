// routes/authRoutes.js

const express = require('express');
const authController = require('../controllers/authController');
const db = require('../db');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
