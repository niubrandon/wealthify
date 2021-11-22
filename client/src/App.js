import { useState } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import './App.scss';
import axios from 'axios';
import React from 'react';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Login from './pages/Login';
import Portfolio from './pages/Portfolio';
import Signup from './pages/Signup';
import Search from './pages/Search';
import Stock from './pages/Stock';
import Modal from './components/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar';
import Leaderboard from './pages/Leaderboard';

function App() {
  //authuser set to null when it is logout, set to jwt when it's login
  const [ authuser, setAuthuser ] = useState(null);
  return (
    <div className='App'>
      <NavBar />
      {/* <Sidebar /> */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/login" element={<Login authuser={authuser} setAuthuser={setAuthuser} />} />
        <Route path="/signup" element={<Signup authuser={authuser} setAuthuser={setAuthuser} />} />
        <Route path='portfolio' element={<Portfolio authuser={authuser} setAuthuser={setAuthuser} />} />
        <Route path='search' element={<Search />} />
        <Route path='leaderboard' element={<Leaderboard />} />
        <Route path='stock'>
          <Route path=':name' element={<Stock />} />
          <Route path=':name/buy' element={<Modal />} />
          <Route path=':name/sell' element={<Modal />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
