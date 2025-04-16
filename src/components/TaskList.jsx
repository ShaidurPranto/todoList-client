import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import './stylesheets/TaskList.css';
import { Button } from '@mui/material';

export default function TaskList({ tasks , setTasks , setError}) {
  const markAsDone = async (index) => {
    try {
      let task = tasks[index];
      task.status = 'done'; // Update the status to 'done'
      const response = await fetch('http://localhost:8080/users/tasks/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(task) 
      });

      if (!response.ok) {
        console.log("Error in response:", response.statusText);
        throw new Error('Failed to update task');
      }

      console.log("Response status:", response.statusText);

      const tasksArray = await response.json(); // already parsed
      setTasks(tasksArray); // directly set it

      console.log(`Fetched updated ${tasksArray.length} tasks.`);
      console.log(tasksArray); // Log the tasks array to the console

    } catch (err) {
      setError('Failed to update task. Please try again later.');
    }
  };

  return (
    <List className="task-list-container">
      {tasks.map((task, index) => {
        const labelId = `checkbox-list-label-${index}`;

        return (
          <ListItem key={index} disablePadding className="task-item">
            <ListItemButton role={undefined} onClick={()=>{/*does nothing*/}} dense>
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
            <Button variant="contained" color="success" className="mark-button" onClick={() => markAsDone(index)} disabled={task.status === 'done'} >
              Mark as Done
            </Button> 
          </ListItem>
        );
      })}
    </List>
  );
}
