import React, { useState } from 'react';
import { FormControlLabel, Checkbox } from '@mui/material';

export default function IncompletedTasks({ tasks, setTasks }) {
    const [showOnlyPending, setShowOnlyPending] = useState(false);

    const handleChange = (event) => {
        const checked = event.target.checked;
        setShowOnlyPending(checked);

        if (checked) {
            // Show only tasks with status 'pending'
            const filteredTasks = tasks.filter(task => task.status === 'pending');
            setTasks(filteredTasks);
        } else {
            // Refetch all tasks from the server (if available) or store a copy somewhere
            fetch('http://localhost:8080/users/tasks', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(res => res.json())
                .then(data => setTasks(data))
                .catch(err => console.error("Error fetching all tasks:", err));
        }
    };

    return (
        <FormControlLabel
            control={<Checkbox checked={showOnlyPending} onChange={handleChange} />}
            label="Show only pending tasks"
            sx={{
                backgroundColor: 'lightgrey',
                borderRadius: '4px',
                px: 2,
                py: 1,
                mx: 1 // optional margin
            }}
        />

    );
}
