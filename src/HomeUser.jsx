import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import { Box, Container, Typography, Card, CardContent, CircularProgress } from '@mui/material';
import Header from './components/Header';
import Footer from './components/Footer';
import SidePanel from './components/SidePanel';
import AddTask from './components/AddTask';
import IncompletedTasks from './components/IncompletedTasks';
import CompletedTasks from './components/CompletedTasks';
import FailedTasks from './components/FailedTasks';
import AllTasks from './components/AllTasks';
import DeveloperInfo from './components/DeveloperInfo';
import { useNavigate } from 'react-router-dom';

const apiUrl = import.meta.env.REACT_APP_API_URL;

console.log("This is HomeUser page");


const styles = {
  rootContainer: {
    // backgroundColor: '#121212',
    color: '#ffffff',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: '10px',
  },
  layoutContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: '10px',
  },
  sidePanel: {
    // backgroundColor: '#1e1e1e',
    width: '30%',
    padding: '20px',
    borderRadius: '10px',
  },
  mainContent: {
    // backgroundColor: '#1e1e1e',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  loadingBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '200px',
  },
  errorText: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: 'red',
    marginTop: '30px',
  },
  taskWrapper: {
    padding: 2,
    borderRadius: 3,
    marginTop: '30px',
  },
  currentTasksTitle: {
    color: '#f0f0f0',
    fontSize: '0.1rem',
    marginBottom: '10px',
    textAlign: 'center',
  },
  noTasksCard: {
    backgroundColor: '#444444',
    margin: '20px auto',
    width: '100%',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
    color: 'rgba(200, 195, 195, 0.8)',
  },
  footerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: '10px',
  }
};


function HomeUser() {
  const [tasks, setTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentView, setCurrentView] = useState('Home');
  const navigate = useNavigate();

  useEffect(() => {
    console.log('HomeUser component mounted');
    console.log("now waiting for 2 seconds before calling fetchTasks");
    const delay = 1000*2; // Set to 0 for immediate execution during development

    const fetchTasks = async () => {
      console.log('Fetching tasks...');
      try {
        const response = await fetch(`${apiUrl}/users/tasks`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });

        if (response.status === 401) {
          navigate('/login');
          return;
        }

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

    // Set a timeout to delay the fetchTasks call by 2 minutes (120000ms)
    const timeoutId = setTimeout(fetchTasks, delay);

    // Cleanup the timeout if the component unmounts
    return () => clearTimeout(timeoutId);

  }, []); // Empty dependency array means this effect runs once after initial render.


  return (
    <Container sx={styles.rootContainer}>

      <Container sx={styles.headerContainer}>
        <Header />
      </Container>

      <Container sx={styles.layoutContainer}>

        <Container sx={styles.sidePanel}>
          <SidePanel currentView={currentView} setCurrentView={setCurrentView} />
        </Container>

        <Container sx={styles.mainContent}>
          {loading ? (
            <Box sx={styles.loadingBox}>
              <CircularProgress sx={{ color: '#ff5722' }} />
            </Box>
          ) : error ? (
            <Typography sx={styles.errorText}>{error}</Typography>
          ) : (
            <>
              {currentView === 'Home' && (
                <>
                  <AddTask tasks={tasks} setTasks={setTasks} setError={setError} allTasks={allTasks} setAllTasks={setAllTasks} />
                  <IncompletedTasks tasks={tasks} setTasks={setTasks} allTasks={allTasks} />
                  <TaskList tasks={tasks} setTasks={setTasks} setError={setError} allTasks={allTasks} setAllTasks={setAllTasks} />
                </>
              )}

              {currentView === 'Completed Tasks' && <CompletedTasks />}
              {currentView === 'Failed Tasks' && <FailedTasks />}
              {currentView === 'Task History' && <AllTasks />}
              {currentView === 'Developer Info' && <DeveloperInfo />}
            </>
          )}
        </Container>


      </Container>

      <Container sx={styles.footerContainer}>
        {/* <Footer /> */}
      </Container>

    </Container>
  );
}

export default HomeUser;
