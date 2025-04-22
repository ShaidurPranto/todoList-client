import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box, InputBase, Menu, MenuItem, Avatar } from '@mui/material';
import { Search as SearchIcon, AccountCircle } from '@mui/icons-material';

export default function Header() {
  // For menu (optional)
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" sx={{
      bgcolor: '#2c2c2c',
      width: '100%',
      top: 0,
      left: 0,
      zIndex: 1201,
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Optional: Adds shadow for a modern look
    }}>

      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

        {/* Left Side: App Name */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Task Manager
        </Typography>

        {/* Middle: Search bar (optional) */}
        <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#333', borderRadius: 1, padding: '4px 8px', maxWidth: '300px' }}>
          <SearchIcon sx={{ color: 'white', marginRight: '8px' }} />
          <InputBase
            sx={{ color: 'white', width: '100%' }}
            placeholder="Search tasks..."
            inputProps={{ 'aria-label': 'search' }}
          />
        </Box>

        {/* Right Side: Profile and Actions */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* Menu Icon for additional options */}
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            onClick={handleMenuClick}
            sx={{ mr: 2 }}
          >
            <AccountCircle />

          </IconButton>

          {/* Avatar Icon (user profile picture) */}
          <Avatar alt="User" src="/path/to/avatar.jpg" sx={{ width: 32, height: 32 }} />

          {/* Menu for Profile Options */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
          </Menu>

          {/* Create Task Button */}
          <Button variant="contained" color="primary" sx={{ marginLeft: 2 }}>
            Create Task
          </Button>
          
        </Box>

      </Toolbar>

    </AppBar>
  );
}
