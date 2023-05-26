import React, { useState, useEffect } from 'react';
import api from '../api-service/api';
import { toast } from 'react-toastify';

const RegistrationForm = ({ onSwitchForm }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userExistsError, setUserExistsError] = useState(false);

  useEffect(() => {
    setUserExistsError(false);
  }, [name, username, password, confirmPassword]);

const handleSubmit = async (e) => {
  e.preventDefault();

  if (password !== confirmPassword) {
    alert('Passwords do not match.');
    return;
  }

  try {
    const response = await api.post('/api/register', {
      name,
      username,
      password
    });

    console.log(response.data);
    // Handle successful registration
    alert('Registration successful!');
    // Redirect to login form
    onSwitchForm();

    // Show toast message
    toast.success('Login successful!', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000, // Close the toast after 3 seconds
    });
  } catch (error) {
    console.error(error);
    alert('User already exists. Please choose a different username.');
    // Handle registration error
    if (error.response && error.response.status === 400) {
      // Display an error message to the user
      
    } else {
      // Handle other errors
    }
  }

  // Reset form fields
  setName('');
  setUsername('');
  setPassword('');
  setConfirmPassword('');
};

  

  return (
    <div className="container my-5 d-flex justify-content-center align-items-center">
      <div className="card p-4" style={{ maxWidth: '400px' }}>
        <form onSubmit={handleSubmit}>
          {userExistsError && (
            <div className="alert alert-danger" role="alert">
              User already exists. Please choose a different username.
            </div>
          )}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username:
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password:
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
