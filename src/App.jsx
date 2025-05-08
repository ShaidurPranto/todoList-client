import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import HomeUser from './HomeUser';
import Demo from './Demo';

function App() {
  useEffect(() => {
    document.body.style.margin = 0;
    document.body.style.backgroundColor = '#242424';
    document.body.style.color = 'rgba(255, 255, 255, 0.87)';
    document.documentElement.style.backgroundColor = '#242424';
  }, []);

  const styles = {
    root: {
      fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif',
      lineHeight: 1.5,
      fontWeight: 400,
      colorScheme: 'light dark',
      fontSynthesis: 'none',
      textRendering: 'optimizeLegibility',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      minHeight: '100vh',
    },
  };

  return (
    <div style={styles.root}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/homeUser" element={<HomeUser />} />
          <Route path="/demo" element={<Demo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
