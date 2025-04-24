import React, { useState, useEffect } from 'react';
import { FormControlLabel, Checkbox, Box, Typography } from '@mui/material';

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 20px',
    borderRadius: '8px',
    marginBottom: '1rem',
    marginTop: '1rem',
    backgroundColor: 'rgba(134, 130, 130, 0.1)', // Light background for better contrast
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Adding some shadow for depth
    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
      backgroundColor: 'rgba(134, 130, 130, 0.2)', // Slightly darker on hover
      boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.15)',
    },
    '&:active': {
      backgroundColor: 'rgba(0, 0, 0, 0.1)', // Darker active state
    },
  },
  checkbox: {
    color: '#1976d2', // Primary color for checkbox
    '&.Mui-checked': {
      color: '#1976d2', // Matching checked color
    },
  },
  label: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: 'rgb(173, 166, 166)', // Darker text for contrast
  },
};

export default function IncompletedTasks({ tasks, setTasks, allTasks }) {
    const [showOnlyPending, setShowOnlyPending] = useState(false);

    useEffect(() => {
        if (showOnlyPending) {
            const filteredTasks = allTasks.filter(task => task.status === 'pending');
            setTasks(filteredTasks);
        } else {
            setTasks(allTasks);
        }
    }, [showOnlyPending, allTasks, setTasks]);

    const handleChange = (event) => {
        const checked = event.target.checked;
        setShowOnlyPending(checked);
    };

    return (
        <Box sx={styles.container}>
          <FormControlLabel
            control={
              <Checkbox
                checked={showOnlyPending}
                onChange={handleChange}
                sx={styles.checkbox}
              />
            }
            label={<Typography sx={styles.label}>Show only pending tasks</Typography>}
          />
        </Box>
    );
}
