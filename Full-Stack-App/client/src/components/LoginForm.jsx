import React, { useState } from 'react';
import api from '../api-service/api';

const LoginForm = ({ onSwitchForm, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/api/login', {
        username,
        password
      });

      console.log(response.data);
      // Handle successful login
      onLogin(); // Call the onLogin function passed from the parent component
    } catch (error) {
      console.error(error);
      // Handle login error
    }

    // Reset form fields
    setUsername('');
    setPassword('');
  };

  return (
    <div className="container my-5 d-flex justify-content-center align-items-center">
      <div className="card p-4" style={{ maxWidth: '400px' }}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username:</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password:</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
          <button type="button" className="btn btn-link" onClick={onSwitchForm}>Switch to Registration</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

