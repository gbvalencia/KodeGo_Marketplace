// controllers/userController.js

const db = require('../db');

const userController = {
  getAllUsers: (req, res) => {
    const users = db.getUsers();
    res.json(users);
  },

  getUserById: (req, res) => {
    const userId = parseInt(req.params.id);
    const user = db.getUserById(userId);
  
    if (user) {
      res.send(user);
    } else {
      res.status(404).send('User not found');
    }
  },

  addUser: (req, res) => {
    const newUser = req.body;
    db.addUser(newUser);
    res.send('User added successfully');
  },

  // Other user-related controller methods
};

module.exports = userController;
