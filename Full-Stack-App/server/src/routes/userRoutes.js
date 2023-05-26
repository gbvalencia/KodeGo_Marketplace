const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all users
router.get('/', (req, res) => {
  const users = db.getUsers();
  res.json(users);
});

// Get a specific user by ID
router.get('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = db.getUserById(userId);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Add a new user
router.post('/', (req, res) => {
  const newUser = req.body;
  db.addUser(newUser);
  res.send('User added successfully');
});

module.exports = router;


