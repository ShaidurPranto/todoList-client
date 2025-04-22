import React, { useState, useEffect } from 'react';
import { FormControlLabel, Checkbox } from '@mui/material';

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
        <FormControlLabel
            control={<Checkbox checked={showOnlyPending} onChange={handleChange} />}
            label="Show only pending tasks"
            sx={{
                backgroundColor: 'transparent',
                width: '100%',
                borderRadius: '4px',
                marginBottom: '1rem',
                marginTop: '1rem',
                '&:hover': {
                    backgroundColor: 'rgba(134, 130, 130, 0.1)',
                },
                '&:active': {
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                },
                '&:focus': {
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                },
            }}
        />
    );
}
