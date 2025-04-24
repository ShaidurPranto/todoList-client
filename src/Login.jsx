import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = { email, password };

    try {
      const response = await fetch('http://localhost:8080/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const result = await response.text();
      localStorage.setItem('token', result);
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
      background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
      fontFamily: 'Segoe UI, sans-serif',
      overflow: 'hidden',
    },
    loginForm: {
      backdropFilter: 'blur(12px)',
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      padding: '30px',
      borderRadius: '15px',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '320px',
      color: '#fff',
      border: '1px solid rgba(255,255,255,0.1)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    },
    title: {
      fontSize: '2em',
      marginBottom: '20px',
      fontWeight: 600,
    },
    label: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginBottom: '15px',
      width: '100%',
      fontSize: '0.9em',
      color: '#ddd',
    },
    input: {
      padding: '10px',
      marginTop: '5px',
      width: '100%',
      border: 'none',
      borderRadius: '8px',
      outline: 'none',
      fontSize: '1em',
      backgroundColor: '#1e2a38',
      color: '#fff',
    },
    button: {
      marginTop: '15px',
      padding: '10px',
      width: '100%',
      background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
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
