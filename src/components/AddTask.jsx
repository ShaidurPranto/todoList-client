import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Card,
  CardContent,
  Stack
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const AddTask = ({tasks, setTasks, onTaskAdded }) => {
  const [definition, setDefinition] = useState('');
  const [eventTime, setEventTime] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showForm, setShowForm] = useState(false);

  const resetForm = () => {
    setDefinition('');
    setEventTime(null);
    setError('');
    setSuccessMessage('');
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
  
    if (!definition || !eventTime) {
      setError('Please fill in all required fields.');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:8080/users/tasks/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          definition,
          status: 'pending',
          eventTime
        })
      });
  
      const message = await response.text();
  
      if (!response.ok) {
        throw new Error(message || 'Failed to add task.');
      }
  
      setSuccessMessage(message);
  
      // ✅ Update task list with the newly added task
      const newTask = {
        definition,
        status: 'pending',
        eventTime,
      };
      setTasks([...tasks, newTask]);
  
      setTimeout(() => resetForm(), 1500);
      if (onTaskAdded) onTaskAdded();
  
    } catch (err) {
      setError(err.message || 'An error occurred.');
    }
  };
  

  if (!showForm) {
    return (
      <Box mt={3}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setShowForm(true)}
        >
          ➕ Add Task
        </Button>
      </Box>
    );
  }

  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>Add New Task</Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {successMessage && <Alert severity="success" sx={{ mb: 2 }}>{successMessage}</Alert>}

        <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Task Definition"
            variant="outlined"
            fullWidth
            required
            value={definition}
            onChange={(e) => setDefinition(e.target.value)}
          />

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label="Event Time"
              value={eventTime}
              onChange={(newValue) => setEventTime(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>

          <Stack direction="row" spacing={2}>
            <Button variant="contained" color="primary" type="submit">Add</Button>
            <Button variant="outlined" color="error" onClick={resetForm}>Cancel</Button>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AddTask;
