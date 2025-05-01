import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_URL;

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsSubmitting(true);

    const user = { name, email, password };

    try {
      const response = await fetch(`${apiUrl}/users/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
        credentials: 'include',
      });

      const text = await response.text();

      if (!response.ok) {
        if (response.status === 400 && text === 'User already exists') {
          setError('User already exists with this email.');
        } else {
          setError('Server error occurred. Please try again later.');
        }
        return;
      }

      // Successful signup
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: 'linear-gradient(135deg, #1a1a1a, #242424)',
      fontFamily: 'Segoe UI, sans-serif',
    },
    form: {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      padding: '30px',
      borderRadius: '15px',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
      display: 'flex',
      flexDirection: 'column',
      width: '340px',
      color: '#ffffff',
      border: '1px solid rgba(255,255,255,0.1)',
    },
    title: {
      fontSize: '2rem',
      marginBottom: '20px',
      fontWeight: 600,
      color: '#90caf9',
      textAlign: 'center',
    },
    label: {
      fontSize: '0.9rem',
      marginBottom: '5px',
      color: '#e0e0e0',
    },
    input: {
      padding: '10px',
      marginBottom: '15px',
      width: '100%',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1em',
      backgroundColor: '#1e2a38',
      color: '#ffffff',
      outline: 'none',
    },
    button: {
      marginTop: '10px',
      padding: '10px',
      background: '#90caf9',
      color: '#000',
      fontWeight: 600,
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      fontSize: '1em',
      transition: 'background 0.3s ease',
    },
    buttonDisabled: {
      background: '#555',
      cursor: 'not-allowed',
      color: '#ccc',
    },
    error: {
      color: '#ff6b6b',
      marginBottom: '10px',
      fontWeight: 500,
      textAlign: 'center',
    },
    success: {
      color: '#00e676',
      marginBottom: '10px',
      fontWeight: 500,
      textAlign: 'center',
    },
    loadingAnimation: {
      textAlign: 'center',
      fontSize: '1.2rem',
      color: '#90caf9',
      animation: 'fadeIn 0.5s ease-in-out infinite alternate',
    },
    '@keyframes fadeIn': {
      from: { opacity: 0.3 },
      to: { opacity: 1 },
    },
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.title}>Create Account</div>

        {error && <div style={styles.error}>{error}</div>}
        {success && (
          <div style={styles.success}>
            Signup successful! Redirecting to login...
            <div style={styles.loadingAnimation}>⏳</div>
          </div>
        )}

        <label style={styles.label}>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
          required
          disabled={isSubmitting || success}
        />

        <label style={styles.label}>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
          disabled={isSubmitting || success}
        />

        <label style={styles.label}>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
          disabled={isSubmitting || success}
        />

        <label style={styles.label}>Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={styles.input}
          required
          disabled={isSubmitting || success}
        />

        <button
          type="submit"
          disabled={isSubmitting || success}
          style={
            isSubmitting || success
              ? { ...styles.button, ...styles.buttonDisabled }
              : styles.button
          }
        >
          {isSubmitting ? 'Signing up...' : 'Signup'}
        </button>
      </form>
    </div>
  );
}

export default Signup;
