import React from 'react';
import { Link } from 'react-router-dom';

function Demo() {

  return (
    <>
    <div style={{ margin: 0, padding: 0, overflow: 'hidden' }}>
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            background: 'linear-gradient(135deg, #1a1a1a, #242424)',
            color: '#ffffff',
            textAlign: 'center',
        }}>
            <h1 style={{
            fontSize: '3rem',
            marginBottom: '1rem',
            fontWeight: 700,
            color: '#90caf9',
            }}>Demo Page</h1>
            <p style={{
            fontSize: '1.2rem',
            marginBottom: '2rem',
            color: '#e0e0e0',
            }}>This is a demo page.</p>
            <Link to="/" style={{
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
            }}>Go to Home</Link>
        </div>
        <div style={{
            marginTop: '20px',
            fontSize: '1rem',
            color: '#e0e0e0',
        }}>
            <p>Visit our <Link to="/homeUser" style={{ color: '#90caf9' }}>Home User</Link> page for more features.</p>
        </div>
    </div>
    </>
  );
}

export default Demo;
