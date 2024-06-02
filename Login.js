import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password,
      });
      setMessage(response.data.message);
      if (response.data.message === 'Login successful') {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('There was an error logging in!', error);
    }
  };

  return (
    <div>
      {isLoggedIn ? (
        <div className="loggedInMessage">
          YOU ARE LOGGED IN!
        </div>
      ) : (
        <div>
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">Login</button>
          </form>
          {message && <p>{message}</p>}
        </div>
      )}
    </div>
  );
}

export default Login;
