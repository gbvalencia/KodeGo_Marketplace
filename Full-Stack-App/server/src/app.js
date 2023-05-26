/* const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// ...

module.exports = app; */



const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const db = require('./db');
const productsData = require('./products'); // Rename the imported module

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

app.post('/api/register', (req, res) => {
  const { name, username, password } = req.body;

  // Check if the username already exists in the database
  const existingUser = db.getUserByUsername(username);
  if (existingUser) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  // Save the new user to the database
  const newUser = {
    name,
    username,
    password,
  };
  db.addUser(newUser);

  // Send a success response
  res.status(201).json({ message: 'Registration successful' });
});

// Login route
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = db.getUserByUsername(username);

  if (!user || user.password !== password) {
    // Invalid username or password
    res.status(401).json({ message: 'Invalid credentials' });
  } else {
    // Successful login
    res.json({ message: 'Login successful', user });
  }
});

// Get all users route (for testing purposes)
app.get('/api/users', (req, res) => {
  const users = db.getUsers();
  res.json(users);
});

app.get('/api/user', (req, res) => {
    // Assuming you have a user ID associated with the authenticated user
    const userId = req.userId;
  
    // Find the user in the database or data source
    const user = db.getUserById(userId);
  
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  });

  app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = db.getUserById(userId); // Use the correct function name
  
    if (user) {
      res.send(user);
    } else {
      res.status(404).send('User not found');
    }
  });
  
  app.post('/users', (req, res) => {
    const newUser = req.body;
    db.addUser(newUser); // Use the correct function name
    res.send('User added successfully');
});

app.get('/api/products', (req, res) => {
  const products = productsData; // Use the imported products data directly
  res.json(products);
});

app.post('/api/orders', (req, res) => {
    // Extract the order details from the request body
    const { items, totalPrice, user } = req.body;
  
    // Implement payment processing logic here
    // You can integrate with a payment gateway or payment service of your choice
  
    // Assuming the payment is successful, create an order record in the database
    const order = {
      items: items,
      totalPrice: totalPrice,
      user: user,
      paymentStatus: 'Paid' // You can update this based on the actual payment status received from the payment service
    };
  
    // Save the order record in the database or any other data storage mechanism
  
    // Return a success response to the client-side
    res.status(200).json({ message: 'Payment successful' });
  });
  

module.exports = app;
