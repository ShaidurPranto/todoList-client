import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import { Box, Container, Typography, Button, Card, CardContent, CircularProgress } from '@mui/material';
import './stylesheets/HomeUser.css';
import Header from './components/Header';
import Footer from './components/Footer';
import SidePanel from './components/SidePanel';
import AddTask from './components/AddTask';
import IncompletedTasks from './components/IncompletedTasks'; 

function HomeUser() {
  const [tasks, setTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
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

        const tasksArray = await response.json(); 
        setTasks(tasksArray); 
        setAllTasks(tasksArray);

        console.log(`Fetched ${tasksArray.length} tasks.`);
        console.log(tasksArray); 

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

      <Container className="header-container">
        <Header />
      </Container>

      <Container className="middle-container">

        <Container className="middle-left-container">
          <SidePanel />
        </Container>

        <Container className="middle-right-container">
          <AddTask tasks={tasks} setTasks={setTasks} setError={setError} allTasks={allTasks} setAllTasks={setAllTasks}/> 

          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="200px">
              <CircularProgress />
            </Box>
          ) : error ? (
            <Typography className="error-message" align="center">{error}</Typography>
          ) : (
            <Box className="task-list" sx={{ padding: 2 , borderRadius: 3, }}>
              <Typography variant="h6" className="section-heading">Current Tasks</Typography>

              {tasks.length === 0 ? (
                <Card className="empty-task-card">
                  <CardContent>
                    <Typography variant="body1" align="center">No tasks available. Please create a new task.</Typography>
                  </CardContent>
                </Card>
              ) : (
                <>
                  <IncompletedTasks tasks={tasks} setTasks={setTasks} allTasks={allTasks}/>
                  <TaskList tasks={tasks} setTasks={setTasks} setError={setError} allTasks={allTasks} setAllTasks={setAllTasks} />
                </>
              )}
            </Box>
          )}

        </Container>

      </Container>

      <Container className="footer-container">
        <Footer />
      </Container>


    </Container>
  );
}

export default HomeUser;
