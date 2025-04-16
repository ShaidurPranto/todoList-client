import './App.css'
import {BrowserRouter , Routes , Route } from "react-router-dom"
import Home from "./components/Home"
import Login from "./components/Login"
import Signup from "./components/Signup"
import HomeUser from './components/HomeUser'

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/homeUser" element={<HomeUser/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
