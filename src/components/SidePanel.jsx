import React from 'react';
import { Box, List, ListItem, ListItemText, Divider, ListItemButton } from '@mui/material';

export default function SidePanel() {
  return (
    <Box
      sx={{
        width: 240,
        height: '100%',
        bgcolor: '#2c2c2c',
        color: 'white',
        p: 2,
        position: 'fixed',
        top: 0,
        left: 0,
        pt: '64px', // height of the AppBar
        overflowY: 'auto'
      }}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="My Tasks" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="Create Task" />
          </ListItemButton>
        </ListItem>
        <Divider sx={{ my: 1, bgcolor: '#444' }} />
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}
