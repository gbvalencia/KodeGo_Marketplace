import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import { ToastContainer } from 'react-toastify';

const App = () => {
  const [isRegistering, setIsRegistering] = useState(true); // Set isRegistering to true initially
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSwitchForm = () => {
    setIsRegistering(!isRegistering);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div>
      <header>
        <img
          src="/images/kodego logo.png"
          width="200"
          height="100"
          className="d-inline-block align-top"
          alt="Logo"
        />
        <h1>Welcome to Kodego</h1>
        {!isLoggedIn && !isRegistering && (
          <button onClick={handleSwitchForm}>Register</button>
        )}
        {!isLoggedIn && isRegistering && (
          <button onClick={handleSwitchForm}>Have an account already? Please login</button>
        )}
      </header>
      {isLoggedIn ? (
        <>
          <Dashboard onLogout={handleLogout} />
          <ToastContainer />
        </>
      ) : (
        <>
          {isRegistering ? (
            <RegistrationForm onSwitchForm={handleSwitchForm} onLogin={handleLogin} />
          ) : (
            <LoginForm onSwitchForm={handleSwitchForm} onLogin={handleLogin} />
          )}
        </>
      )}
    </div>
  );
};

export default App;
