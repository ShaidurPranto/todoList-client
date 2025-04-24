import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import { WidthFull } from '@mui/icons-material';

const footerStyles = {
  container: {
    bgcolor: '#1e1e1e', // Dark background for modern look
    color: 'white',
    py: 3, // Adjusted padding for better spacing
    textAlign: 'center',
    mt: 'auto', // Ensures footer stays at the bottom of the page
    boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.2)', // Adds a subtle shadow for depth
    width: '2500px'
  },
  text: {
    fontSize: '14px', // Smaller font size for a clean look
    letterSpacing: '0.5px', // Slight letter-spacing for modern typography
    color: 'rgba(255, 255, 255, 0.7)', // Slightly dimmed text for subtlety
  },
  link: {
    color: 'rgba(255, 255, 255, 0.9)', // Lighter link color
    textDecoration: 'none',
    '&:hover': {
      color: '#1976d2', // Primary color on hover
    },
  },
};

export default function Footer() {
  return (
    <Box component="footer" sx={footerStyles.container}>
      <Typography sx={footerStyles.text}>
        © 2025 Task Manager. All rights reserved.
      </Typography>
      {/* <Typography sx={{ ...footerStyles.text, mt: 1 }}>
        <Link href="/terms" sx={footerStyles.link}>
          Terms of Service
        </Link>{' '}
        |{' '}
        <Link href="/privacy" sx={footerStyles.link}>
          Privacy Policy
        </Link>
      </Typography> */}
    </Box>
  );
}
