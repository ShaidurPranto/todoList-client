import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
    return (
        <div className="home">
            <div><h1>This is a Todo List application</h1><p>Manage your tasks efficiently!</p></div>
            <Link to="/login">Login</Link>
        </div>
    )
}

export default Home

