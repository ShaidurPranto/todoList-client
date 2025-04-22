import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Button, Typography, Menu, MenuItem, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';  // Three dots icon
import './stylesheets/TaskList.css';

export default function TaskList({ tasks, setTasks, setError, allTasks, setAllTasks }) {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedTask, setSelectedTask] = React.useState(null);

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
      const response = await fetch('http://localhost:8080/users/tasks/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(selectedTask)
      });

      if (!response.ok) {
        console.log("Error in response:", response.statusText);
        throw new Error('Failed to update task');
      }

      const tasksArray = await response.json();
      setTasks(tasksArray);
      setAllTasks(tasksArray); 

      console.log(`Fetched updated ${tasksArray.length} tasks.`);
      console.log(tasksArray);

    } catch (err) {
      setError('Failed to update task. Please try again later.');
    }
    handleClose();
  };

  const handleDelete = () => {
    // Placeholder for delete functionality
    console.log('Delete task:', selectedTask);
    handleClose();
  };

  return (
    <List className="task-list-container">
      {tasks.map((task, index) => {
        const labelId = `checkbox-list-label-${index}`;

        return (
          <ListItem key={index} disablePadding className="task-item">
            <div className="task-content">
              {/* Show 'Done' label above task definition for done tasks */}
              {task.status === 'done' && (
                <Typography variant="body2" color="success.main" className="status-label">
                  Done
                </Typography>
              )}

              {/* Show 'Pending' label above task definition for pending tasks */}
              {task.status === 'pending' && (
                <Typography variant="body2" color="warning.main" className="status-label">
                  Pending
                </Typography>
              )}

              <ListItemButton role={undefined} onClick={() => { /* does nothing */ }} dense>
                <ListItemText
                  id={labelId}
                  primary={<span className="task-definition">{task.definition}</span>}
                  secondary={
                    <span className="task-details">
                      Status: <b>{task.status}</b> | Time: <b>{new Date(task.eventTime).toLocaleString()}</b>
                    </span>
                  }
                />
              </ListItemButton>
            </div>

            {/* Three dots icon to open the menu */}
            <IconButton onClick={(event) => handleClick(event, task)}>
              <MoreVertIcon />
            </IconButton>

            {/* Menu with options */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl) && selectedTask === task}
              onClose={handleClose}
            >
              <MenuItem onClick={markAsDone} disabled={task.status === 'done'}>
                Mark as Done
              </MenuItem>
              <MenuItem onClick={handleDelete}>
                Delete
              </MenuItem>
            </Menu>
          </ListItem>
        );
      })}
    </List>
  );
}
