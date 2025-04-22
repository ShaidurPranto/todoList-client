import React, { useState } from 'react';
import './stylesheets/Login.css'; 
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {

    e.preventDefault();

    const data = {
      email,
      password
    };

    try {
      const response = await fetch('http://localhost:8080/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // remove later
      console.log("data sent to the server is " + data);

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const result = await response.text();
      localStorage.setItem('token', result);
      navigate('/homeUser');

      console.log(result);

    } catch (err) {
      setError('Login failed. Please check your credentials.');
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <h1>Login Page</h1>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="login-form">
        <label>
          Email:
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
