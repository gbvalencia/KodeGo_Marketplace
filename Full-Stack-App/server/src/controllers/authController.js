// controllers/authController.js

const db = require('../db');

const authController = {
  register: (req, res) => {
    const { name, username, password } = req.body;

    const existingUser = db.getUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const newUser = {
      name,
      username,
      password,
    };
    db.addUser(newUser);

    res.status(201).json({ message: 'Registration successful' });
  },

  login: (req, res) => {
    const { username, password } = req.body;
    const user = db.getUserByUsername(username);

    if (!user || user.password !== password) {
      res.status(401).json({ message: 'Invalid credentials' });
    } else {
      res.json({ message: 'Login successful', user });
    }
  },

  // Other authentication-related controller methods
};

module.exports = authController;
