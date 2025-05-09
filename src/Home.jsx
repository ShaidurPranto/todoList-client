import React from 'react';
import { Link } from 'react-router-dom';

const apiUrl = import.meta.env.REACT_APP_API_URL;
const loginWithGoogle = apiUrl + "/oauth2/authorization/google";



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


    googleButton: {
      marginTop: '20px',
      padding: '10px 16px',
      background: '#ffffff',
      color: '#444',
      borderRadius: '6px',
      fontWeight: 500,
      fontSize: '0.95em',
      border: '1px solid #ccc',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      textDecoration: 'none',
      transition: 'background 0.3s',
    },

    googleIcon: {
      width: '20px',
      height: '20px',
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
      <div style={styles.root}>
        <div style={styles.container}>
          <h1 style={styles.heading}>Plan It. Make it Done.</h1>
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


          <a href={loginWithGoogle} style={styles.googleButton}>
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google"
              style={styles.googleIcon}
            />
            <span>Continue with Google</span>
          </a>


        </div>


      </div>
    </>
  );
}

export default Home;
