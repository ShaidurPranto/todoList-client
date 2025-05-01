import React, { useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box, InputBase, Menu, MenuItem, Avatar } from '@mui/material';
import { Search as SearchIcon, AccountCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const apiUrl = import.meta.env.REACT_APP_API_URL;

const styles = {
  appBar: {
    bgcolor: '#2c2c2c',
    width: '100%',
    top: 0,
    left: 0,
    zIndex: 1201,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Adds shadow for a modern look
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 1,
    padding: '4px 8px',
    maxWidth: '300px',
  },
  searchIcon: {
    color: 'white',
    marginRight: '8px',
  },
  inputBase: {
    color: 'white',
    width: '100%',
  },
  profileBox: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    width: 32,
    height: 32,
  },
  createTaskButton: {
    marginLeft: 2,
  }
};

export default function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [userName, setUserName] = React.useState('');
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await fetch(`${apiUrl}/users/name`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });

        if (response.status === 401) {
          navigate('/login'); 
          return;
        }

        if (!response.ok) throw new Error('Failed to fetch user name');

        const data = await response.text();
        setUserName(data);
      } catch (err) {
        console.error('Error fetching user name:', err);
      }
    };

    fetchUserName();
  }, []);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" sx={styles.appBar}>
      <Toolbar sx={styles.toolbar}>
        {/* Left Side: App Name */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Task Manager
        </Typography>

        {/* Middle: Search bar (optional) */}
        {/* <Box sx={styles.searchBox}>
          <SearchIcon sx={styles.searchIcon} />
          <InputBase
            sx={styles.inputBase}
            placeholder="Search tasks..."
            inputProps={{ 'aria-label': 'search' }}
          />
        </Box> */}

        {/* Right Side: Profile and Actions */}
        <Box sx={styles.profileBox}>
          {/* Menu Icon for additional options */}
          {/* <IconButton
            size="large"
            edge="end"
            color="inherit"
            onClick={handleMenuClick}
            sx={{ mr: 2 }}
          >
            <AccountCircle />
          </IconButton> */}

          {/* Avatar Icon (user profile picture) */}
          {/* <Avatar alt="User" src="/path/to/avatar.jpg" sx={styles.avatar} /> */}

          {/* ✅ Show user name here */}
          <Typography sx={{ color: 'white', ml: 1 }}>{userName}</Typography>

          {/* Menu for Profile Options */}
          {/* <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
          </Menu> */}

          {/* Create Task Button */}
          {/* <Button variant="contained" color="primary" sx={styles.createTaskButton}>
            Create Task
          </Button> */}

        </Box>

      </Toolbar>
    </AppBar>
  );
}

