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
import { useNavigate } from 'react-router-dom';

const apiUrl = import.meta.env.REACT_APP_API_URL;

const styles = {
  addButtonBox: {
    mt: 3,
  },
  card: {
    mt: 3,
    backgroundColor: '#1e1e1e',
    boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
    color: '#ffffff',
    borderRadius: 2,
    width : 800,
  },
  title: {
    color: '#ffffff',
  },
  formBox: {
    backgroundColor: 'rgb(167, 163, 163)',
    color: '#1e1e1e',
    border: '1px solid #444',
    borderRadius: 2,
    padding: 3,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  addButton: {
    backgroundColor: '#1976d2',
    '&:hover': {
      backgroundColor: '#1976d2',
    },
  },
  cancelButton: {
    backgroundColor: '#d32f2f',
    '&:hover': {
      backgroundColor: '#d32f2f',
    },
  }
};

const AddTask = ({ tasks, setTasks, onTaskAdded, allTasks, setAllTasks }) => {
  const [definition, setDefinition] = useState('');
  const [eventTime, setEventTime] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

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
      const response = await fetch(`${apiUrl}/users/tasks/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          definition,
          status: 'pending',
          eventTime
        }),
        credentials: 'include'
      });

      if(response.status === 401) {
        navigate('/login');
        return;
      }

      const message = await response.text();

      if (!response.ok) {
        throw new Error(message || 'Failed to add task.');
      }

      setSuccessMessage(message);

      const newTask = {
        definition,
        status: 'pending',
        eventTime,
      };
      setTasks([...tasks, newTask]);
      setAllTasks([...allTasks, newTask]);

      setTimeout(() => resetForm(), 1500);
      if (onTaskAdded) onTaskAdded();

    } catch (err) {
      setError(err.message || 'An error occurred.');
    }
  };

  if (!showForm) {
    return (
      <Box sx={styles.addButtonBox}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setShowForm(true)}
        >
          ➕ Add Task
        </Button>
      </Box>
    );
  }

  return (
    <Card sx={styles.card}>
      <CardContent>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {successMessage && <Alert severity="success" sx={{ mb: 2 }}>{successMessage}</Alert>}

        <Box component="form" onSubmit={handleSubmit} sx={styles.formBox}>
          <TextField
            label="Define Task"
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
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                />
              )}
            />
          </LocalizationProvider>

          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              type="submit"
              sx={styles.addButton}
            >
              Add
            </Button>

            <Button
              variant="contained"
              onClick={resetForm}
              sx={styles.cancelButton}
            >
              Cancel
            </Button>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AddTask;
