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

export default function TaskList({ tasks }) {

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
            <Button variant="contained" color="success" className="mark-button" onClick={() => {/* Handle comment click */}}>
              Mark as Done
            </Button> 
          </ListItem>
        );
      })}
    </List>
  );
}
