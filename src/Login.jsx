import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const apiUrl = import.meta.env.REACT_APP_API_URL;
console.log("This is login page");

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  console.log('This is login page , API URL:', apiUrl);

  const handleSubmit = async (e) => {

    console.log('Form submitted:', { email, password });

    e.preventDefault();
    setIsSubmitting(true);
    if(isSubmitting) return;

    const data = { email, password };

    try {
      const response = await fetch(`${apiUrl}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const result = await response.text();
      navigate('/homeUser');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const styles = {
    loginContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: 'linear-gradient(135deg, #1a1a1a, #242424)',
      fontFamily: 'Segoe UI, sans-serif',
    },
    loginForm: {
      backgroundColor: 'rgba(255, 255, 255, 0.04)',
      padding: '30px',
      borderRadius: '15px',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '320px',
      color: '#ffffff',
      border: '1px solid rgba(255,255,255,0.1)',
    },
    title: {
      fontSize: '2rem',
      marginBottom: '20px',
      fontWeight: 600,
      color: '#90caf9',
    },
    label: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginBottom: '15px',
      width: '100%',
      fontSize: '0.9em',
      color: '#e0e0e0',
    },
    input: {
      padding: '10px',
      marginTop: '5px',
      width: '100%',
      border: 'none',
      borderRadius: '8px',
      backgroundColor: '#1e2a38',
      color: '#ffffff',
      fontSize: '1em',
      outline: 'none',
    },
    button: {
      marginTop: '15px',
      padding: '10px',
      width: '100%',
      background: '#90caf9',
      color: '#000000',
      border: 'none',
      borderRadius: '10px',
      fontWeight: 600,
      fontSize: '1em',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    buttonDisabled: {
      background: '#555',
      cursor: 'not-allowed',
      color: '#ccc',
    },
    errorMessage: {
      color: '#ff6b6b',
      marginBottom: '10px',
      fontWeight: 500,
    },
  };

  return (
    <div style={styles.loginContainer}>
      <form onSubmit={handleSubmit} style={styles.loginForm}>
        <div style={styles.title}>Welcome Back 👋</div>
        {error && <div style={styles.errorMessage}>{error}</div>}
        <label style={styles.label}>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
        </label>
        <label style={styles.label}>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
        </label>
        <button
          type="submit"
          disabled={isSubmitting || !email || !password}
          style={
            isSubmitting
              ? { ...styles.button, ...styles.buttonDisabled }
              : styles.button
          }
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default Login;
