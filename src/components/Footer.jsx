import React from 'react';
import { Box, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#1e1e1e',
        color: 'white',
        py: 2,
        textAlign: 'center',
        mt: 'auto',
        marginTop: 20,
      }}
    >
      <Typography variant="body2">© 2025 Task Manager. All rights reserved.</Typography>
    </Box>
  );
}
