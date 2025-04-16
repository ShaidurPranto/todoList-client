import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';
import { Box, Container, Typography, Button, Card, CardContent, CircularProgress } from '@mui/material';
import './stylesheets/HomeUser.css';

function HomeUser() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:8080/users/tasks', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }

        const tasksArray = await response.json(); // already parsed
        setTasks(tasksArray); // directly set it

        console.log(`Fetched ${tasksArray.length} tasks.`);
        console.log(tasksArray); // Log the tasks array to the console

      } catch (err) {
        setError('Failed to load tasks. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return (
    <Container maxWidth="lg" className="home-user-container">
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" mb={4}>
        <Typography variant="h3" className="heading">Welcome to Your Dashboard</Typography>
        <Typography variant="h5" color="textSecondary">Manage your tasks and progress</Typography>
        <Button variant="contained" color="primary" className="create-task-btn" sx={{ mt: 2 }}>Create New Task</Button>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="200px">
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography className="error-message" align="center">{error}</Typography>
      ) : (
        <Box className="task-list">
          <Typography variant="h5" className="section-heading">Your Tasks</Typography>

          {tasks.length === 0 ? (
            <Card className="empty-task-card">
              <CardContent>
                <Typography variant="body1" align="center">No tasks available. Please create a new task.</Typography>
              </CardContent>
            </Card>
          ) : (
            <TaskList tasks={tasks} />
          )}
        </Box>
      )}

      {/* Add some Dummy Cards */}
      <Box display="flex" justifyContent="space-around" mt={4}>
        <Card className="dummy-card">
          <CardContent>
            <Typography variant="h6" className="card-title">Statistics</Typography>
            <Typography variant="body2">Some user statistics here, like completed tasks, pending tasks, etc.</Typography>
          </CardContent>
        </Card>
        <Card className="dummy-card">
          <CardContent>
            <Typography variant="h6" className="card-title">Recent Activity</Typography>
            <Typography variant="body2">Recent activity or notifications can be shown here.</Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default HomeUser;
