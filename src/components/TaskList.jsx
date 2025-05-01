import * as React from 'react';
import {
  List, ListItem, ListItemButton, ListItemText, Menu, MenuItem,
  IconButton, Typography
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_URL;

const styles = {
  list: {
    backgroundColor: '#2e2e2e',
    borderRadius: 2,
    padding: 2,
    width: 900,
    margin: '0 auto',
    boxShadow: 3
  },
  listItem: {
    backgroundColor: '#333333',
    borderRadius: 2,
    margin: '10px 0',
    padding: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  statusText: {
    // fontWeight: 'bold',
    marginBottom: 1
  },
  taskPrimary: {
    fontSize: '1.2rem',
    // fontWeight: 'bold',
    color: '#f1f1f1'
  },
  taskSecondary: {
    fontSize: '0.9rem',
    color: '#757575'
  },
  iconButton: {
    color: '#ff5722'
  }
};

export default function TaskList({ tasks, setTasks, setError, allTasks, setAllTasks }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedTask, setSelectedTask] = React.useState(null);
  const navigate = useNavigate();

  const handleClick = (event, task) => {
    setAnchorEl(event.currentTarget);
    setSelectedTask(task);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedTask(null);
  };

  const markAsDone = async () => {
    if (!selectedTask) return;

    try {
      selectedTask.status = 'done';
      const response = await fetch(`${apiUrl}/users/tasks/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(selectedTask),
        credentials: 'include'  
      });

      if (response.status === 401) {
        navigate('/login');
        return;
      }

      if (!response.ok) throw new Error('Failed to update task');

      const tasksArray = await response.json();
      setTasks(tasksArray);
      setAllTasks(tasksArray);

    } catch (err) {
      setError('Failed to update task. Please try again later.');
    }

    handleClose();
  };

  const handleDelete = async () => {
    if (!selectedTask) return;

    try {
      const response = await fetch(`${apiUrl}/users/tasks/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(selectedTask),
        credentials: 'include'  
      });

      if (response.status === 401) {
        navigate('/login');
        return;
      }

      if (!response.ok) throw new Error('Failed to delete task');

      const tasksArray = await response.json();
      setTasks(tasksArray);
      setAllTasks(tasksArray);

    } catch (err) {
      setError('Failed to delete task. Please try again later.');
    }

    handleClose();
  };

  return (
    <List sx={styles.list}>
      {tasks.map((task, index) => {
        const labelId = `checkbox-list-label-${index}`;
        return (
          <ListItem key={index} disablePadding sx={styles.listItem}>
            <div>
              {task.status === 'done' && (
                <Typography variant="body2" color="success.main" sx={styles.statusText}>
                  Done
                </Typography>
              )}
              {task.status === 'pending' && (
                <Typography variant="body2" color="warning.main" sx={styles.statusText}>
                  Pending
                </Typography>
              )}
              <ListItemButton dense>
                <ListItemText
                  id={labelId}
                  primary={<span style={styles.taskPrimary}>{task.definition}</span>}
                  secondary={
                    <span style={styles.taskSecondary}>
                      Do within: <b>{new Date(task.eventTime).toLocaleString()}</b>
                    </span>
                  }
                />
              </ListItemButton>
            </div>

            <IconButton onClick={(e) => handleClick(e, task)} sx={styles.iconButton}>
              <MoreVertIcon />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl) && selectedTask === task}
              onClose={handleClose}
            >
              <MenuItem onClick={markAsDone} disabled={task.status === 'done'}>
                Mark as Done
              </MenuItem>
              <MenuItem onClick={handleDelete}>Delete</MenuItem>
            </Menu>
          </ListItem>
        );
      })}
    </List>
  );
}
