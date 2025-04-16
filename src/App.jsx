import './stylesheets/App.css'
import {BrowserRouter , Routes , Route } from "react-router-dom"
import Home from "./Home"
import Login from "./Login"
import Signup from "./Signup"
import HomeUser from './HomeUser'

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
