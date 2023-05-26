// models/db.js

const users = [];

const db = {
  getUsers: () => users,
  getUserById: (userId) => users.find((user) => user.id === userId),
  getUserByUsername: (username) => users.find((user) => user.username === username),
  addUser: (user) => users.push({ ...user, id: users.length + 1 }),
};

module.exports = db;


  