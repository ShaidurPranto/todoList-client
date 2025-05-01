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

const styles = {
  container: {
    mt: 4,
    p: 2,
    borderRadius: '12px',
    bgcolor: '#121212',
    boxShadow: '0 0 12px rgba(0,0,0,0.5)',
    width: '100%',
    overflow: 'hidden',
  },
  header: {
    color: '#00bfa5',
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
    bgcolor: '#1e1e1e',
    color: '#e0e0e0',
    borderRadius: '8px',
    p: 1,
  },
  listItem: {
    borderBottom: '1px solid #333',
    px: 2,
    py: 1.5,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    wordBreak: 'break-word',
  },
  taskPrimary: {
    fontSize: '1rem',
    fontWeight: 500,
    color: '#fafafa',
  },
  taskSecondary: {
    fontSize: '0.875rem',
    color: '#80cbc4',
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

const getCompletionEmoji = (count) => {
  if (count >= 20) return '👑';
  if (count >= 10) return '🚀';
  if (count >= 5) return '🥳';
  return '✅';
};

const getEmptyState = () => ({
  message: "Looks like you haven't completed any tasks yet.",
  emoji: '😴',
});

export default function CompletedTasks() {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompletedTasks = async () => {
      try {
        const response = await fetch('http://localhost:8080/users/tasks/previousCompleted', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });

        if (response.status === 401) {
          navigate('/login');
          return;
        }

        if (!response.ok) throw new Error('Failed to fetch completed tasks');

        const data = await response.json();
        setCompletedTasks(data);
      } catch (err) {
        setError('Could not load completed tasks. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchCompletedTasks();
  }, []);

  const openConfirmDialog = (task) => {
    setTaskToDelete(task);
    setConfirmOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    if (!taskToDelete) return;

    try {
      const response = await fetch('http://localhost:8080/users/tasks/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskToDelete),
        credentials: 'include',
      });

      if (response.status === 401) {
        navigate('/login');
        return;
      }

      if (!response.ok) throw new Error('Failed to delete task');

      setCompletedTasks((prev) =>
        prev.filter(
          (t) => !(t.definition === taskToDelete.definition && t.eventTime === taskToDelete.eventTime)
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
        <CircularProgress sx={{ color: '#00bfa5' }} />
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

  const total = completedTasks.length;

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
        You have completed <span style={{ color: '#ffffff' }}>{total}</span> task{total > 1 ? 's' : ''} till now!
      </Typography>
      <div style={styles.animation}>{getCompletionEmoji(total)}</div>

      <Divider sx={{ mb: 2, backgroundColor: '#444' }} />

      <List sx={styles.list}>
        {completedTasks.map((task, index) => (
          <ListItem key={index} sx={styles.listItem}>
            <Box sx={{ display: 'flex', width: '100%' }}>
              <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                <ListItemText
                  primary={<span style={styles.taskPrimary}>{task.definition}</span>}
                  secondary={
                    <span style={styles.taskSecondary}>
                      Done within: <b>{new Date(task.eventTime).toLocaleString()}</b>
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

      {/* Delete Confirmation Dialog */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the task:
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
