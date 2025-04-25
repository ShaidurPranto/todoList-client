import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const styles = {
    root: {
      margin: 0,
      padding: 0,
      overflow: 'hidden',
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      background: 'linear-gradient(135deg, #1a1a1a, #242424)',
      color: '#ffffff',
      textAlign: 'center',
      animation: 'fadeIn 1.2s ease-in-out',
    },
    heading: {
      fontSize: '3rem',
      marginBottom: '1rem',
      fontWeight: 700,
      color: '#90caf9',
      animation: 'slideDown 1s ease-out',
    },
    subText: {
      fontSize: '1.2rem',
      marginBottom: '2rem',
      color: '#e0e0e0',
      animation: 'fadeIn 1.8s ease-in-out',
    },
    link: {
      padding: '0.8rem 2rem',
      margin: '0.5rem',
      fontSize: '1rem',
      fontWeight: 600,
      textDecoration: 'none',
      borderRadius: '8px',
      border: '2px solid #90caf9',
      color: '#90caf9',
      backgroundColor: 'transparent',
      transition: 'all 0.3s ease',
      animation: 'popIn 1.4s ease-in-out',
    },
  };

  const handleHoverIn = (e) => {
    e.target.style.backgroundColor = '#90caf9';
    e.target.style.color = '#000';
  };

  const handleHoverOut = (e) => {
    e.target.style.backgroundColor = 'transparent';
    e.target.style.color = '#90caf9';
  };

  return (
    <>
      <style>
        {`
          @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }

          @keyframes slideDown {
            0% { transform: translateY(-20px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }

          @keyframes popIn {
            0% { transform: scale(0.8); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }

          /* Also clear any extra scroll from the body or html */
          body, html {
            margin: 0;
            padding: 0;
            overflow: hidden;
          }
        `}
      </style>

      <div style={styles.root}>
        <div style={styles.container}>
          <h1 style={styles.heading}>Plan It. Do It. Make it Done.</h1>
          <p style={styles.subText}>Manage your tasks efficiently and stay organized.</p>

          <Link
            to="/login"
            style={styles.link}
            onMouseEnter={handleHoverIn}
            onMouseLeave={handleHoverOut}
          >
            Login
          </Link>
          <Link
            to="/signup"
            style={styles.link}
            onMouseEnter={handleHoverIn}
            onMouseLeave={handleHoverOut}
          >
            Signup
          </Link>
        </div>
      </div>
    </>
  );
}

export default Home;
