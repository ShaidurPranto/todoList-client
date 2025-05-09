import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const apiUrl = import.meta.env.REACT_APP_API_URL;
console.log("This is login page");
const loginWithGoogle = apiUrl + "/oauth2/authorization/google";

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
    if (isSubmitting) return;

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
      flexDirection: 'column',
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
      padding: '10px 20px',
      background: '#90caf9',
      color: '#000000',
      border: 'none',
      borderRadius: '10px',
      fontWeight: 600,
      fontSize: '1em',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      alignSelf: 'flex-start',
      width: 'auto',
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

    googleButton: {
      // marginTop: '12px',
      padding: '8px 12px',
      background: '#ffffff',
      color: '#444',
      borderRadius: '6px',
      fontWeight: 500,
      fontSize: '0.85em',
      border: '1px solid #ccc',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      transition: 'background 0.3s',
    },
    googleIcon: {
      width: '16px',
      height: '16px',
    },
    googleText: {
      color: '#444',
    },

    // Style for the horizontal line
    horizontalLine: {
      width: '100%',
      border: '1px solid #ccc',
      marginTop: '20px',
      marginBottom: '20px',
    },
  };

  return (
    <div style={styles.loginContainer}>
      <form onSubmit={handleSubmit} style={styles.loginForm}>
        <div style={styles.title}>Welcome Back</div>
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

        {/* Forgot password */}
        <div style={{ marginTop: '10px', alignSelf: 'flex-end' }}>
          <a href="/demo" style={{ color: '#90caf9', textDecoration: 'none' }}>
            Forgot Password?
          </a>
        </div>

        {/* Submit Button */}
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

        {/* Horizontal line */}
        <hr style={styles.horizontalLine} />

        {/* Google Login Button */}
        {/* <a href={loginWithGoogle} style={{ marginTop: '12px', textDecoration: 'none' }}>
          <div style={styles.googleButton}>
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google"
              style={styles.googleIcon}
            />
            <span style={styles.googleText}>Login with Google</span>
          </div>
        </a> */}
      </form>
    </div>
  );
}

export default Login;
