import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <header className="header">
        <h1>TripSplit</h1>
      </header>
      <div className="buttons">
        <Link to="/login" className="loginBtn">Login</Link>
        <Link to="/register" className="signupBtn">Signup</Link>
      </div>
    </div>
  )
}

export default Home;