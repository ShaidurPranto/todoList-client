import React, { useEffect, useState } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  CircularProgress,
  IconButton,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_URL;

const styles = {
  container: {
    mt: 4,
    p: 2,
    borderRadius: '12px',
    width: 900,
    overflow: 'hidden',
  },
  header: {
    color: '#64b5f6',
    fontSize: '1.25rem',
    fontWeight: 600,
    textAlign: 'center',
    mb: 2,
  },
  animation: {
    fontSize: '2rem',
    textAlign: 'center',
    mb: 2,
  },
  list: {
    color: '#e0e0e0',
    borderRadius: '8px',
  },
  listItem: {
    px: 2,
    py: 1.5,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    wordBreak: 'break-word',
    marginBottom: 1,
    padding: 2,
    backgroundColor: '#333333',
    borderRadius: 2,
    '&:hover': {
      backgroundColor: '#444444',
    },
  },
  taskPrimary: {
    fontSize: '1rem',
    fontWeight: 500,
    color: '#fafafa',
  },
  taskSecondary: {
    fontSize: '0.875rem',
    color: '#90caf9',
  },
  iconButton: {
    color: '#ef5350',
    ml: 2,
  },
  loadingBox: {
    display: 'flex',
    justifyContent: 'center',
    mt: 6,
  },
};

const getMoodEmoji = (count) => {
  if (count >= 30) return '💼';
  if (count >= 20) return '🚀';
  if (count >= 10) return '📝';
  return '📄';
};

const getEmptyState = () => ({
  message: 'You haven’t created any tasks yet!',
  emoji: '🫥',
});

export default function AllTasks() {
  const [allTasks, setAllTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllTasks = async () => {
      try {
        const response = await fetch(`${apiUrl}/users/tasks/all`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });

        if(response.status === 401) {
          navigate('/login');
          return;
        }

        if (!response.ok) throw new Error('Failed to fetch all tasks');

        const data = await response.json();
        setAllTasks(data);
      } catch (err) {
        setError('Could not load all tasks. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchAllTasks();
  }, []);

  const openConfirmDialog = (task) => {
    setTaskToDelete(task);
    setConfirmOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    if (!taskToDelete) return;

    try {
      const response = await fetch(`${apiUrl}/users/tasks/delete`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskToDelete),
        credentials: 'include',
      });

      if(response.status === 401) {
        navigate('/login');
        return;
      }

      if (!response.ok) throw new Error('Failed to delete task');

      setAllTasks((prev) =>
        prev.filter(
          (t) =>
            t.definition !== taskToDelete.definition ||
            t.eventTime !== taskToDelete.eventTime
        )
      );
    } catch (err) {
      setError('Failed to delete task. Please try again later.');
    }

    setConfirmOpen(false);
    setTaskToDelete(null);
  };

  if (loading) {
    return (
      <Box sx={styles.loadingBox}>
        <CircularProgress sx={{ color: '#64b5f6' }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center" sx={{ mt: 3 }}>
        {error}
      </Typography>
    );
  }

  const total = allTasks.length;

  if (total === 0) {
    const empty = getEmptyState();
    return (
      <Box sx={styles.container}>
        <Typography sx={styles.header}>{empty.message}</Typography>
        <div style={styles.animation}>{empty.emoji}</div>
      </Box>
    );
  }

  return (
    <Box sx={styles.container}>
      <Typography sx={styles.header}>
        You’ve created <span style={{ color: '#ffffff' }}>{total}</span> task{total > 1 ? 's' : ''}.
      </Typography>
      <div style={styles.animation}>{getMoodEmoji(total)}</div>

      <Divider sx={{ mb: 2, backgroundColor: '#444' }} />

      <List sx={styles.list}>
        {allTasks.map((task, index) => (
          <ListItem key={index} sx={styles.listItem}>
            <Box sx={{ display: 'flex', width: '100%' }}>
              <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                <ListItemText
                  primary={<span style={styles.taskPrimary}>{task.definition}</span>}
                  secondary={
                    <span style={styles.taskSecondary}>
                      Target Date : <b>{new Date(task.eventTime).toLocaleString()}</b>
                    </span>
                  }
                />
              </Box>
              <IconButton
                onClick={() => openConfirmDialog(task)}
                sx={{ ...styles.iconButton, alignSelf: 'start' }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </ListItem>

        ))}
      </List>

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this task:
            <br />
            <b>{taskToDelete?.definition}</b>
            <br />
            scheduled for <b>{new Date(taskToDelete?.eventTime).toLocaleString()}</b>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirmed} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
