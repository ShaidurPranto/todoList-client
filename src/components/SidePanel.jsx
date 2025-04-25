import React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemButton,
  ListItemIcon,
} from '@mui/material';

import HomeIcon from '@mui/icons-material/Home';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import ListAltIcon from '@mui/icons-material/ListAlt';
import InfoIcon from '@mui/icons-material/Info';

const panelStyles = {
  container: {
    width: 240,
    height: '100%',
    bgcolor: '#2c2c2c',
    color: 'white',
    p: 2,
    position: 'fixed',
    top: 0,
    left: 0,
    pt: '64px', // height of the AppBar
    overflowY: 'auto',
  },
  icon: {
    color: '#ffffff',
    minWidth: '40px',
  },
};

const mainMenuItems = [
  { label: 'Home', icon: <HomeIcon /> },
  { label: 'Completed Tasks', icon: <CheckCircleIcon /> },
  { label: 'Failed Tasks', icon: <ErrorIcon /> },
  { label: 'Task History', icon: <ListAltIcon /> },
];

const developerMenuItem = { label: 'Developer Info', icon: <InfoIcon /> };

export default function SidePanel({ currentView, setCurrentView }) {
  const onSelect = (view) => {
    setCurrentView(view);
  };

  return (
    <Box sx={panelStyles.container}>
      <List>
        {mainMenuItems.map(({ label, icon }) => (
          <ListItem disablePadding key={label}>
            <ListItemButton selected={currentView === label} onClick={() => onSelect(label)}>
              <ListItemIcon sx={panelStyles.icon}>{icon}</ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 1, bgcolor: '#444' }} />

      <List>
        <ListItem disablePadding key={developerMenuItem.label}>
          <ListItemButton
            selected={currentView === developerMenuItem.label}
            onClick={() => onSelect(developerMenuItem.label)}
          >
            <ListItemIcon sx={panelStyles.icon}>{developerMenuItem.icon}</ListItemIcon>
            <ListItemText primary={developerMenuItem.label} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}
