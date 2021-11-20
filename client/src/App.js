import { Routes, Route, Link } from 'react-router-dom';
import './App.scss';
import axios from 'axios';
import React from 'react';
import Nav from './components/Nav';
import Home from './pages/Home';
import Login from './pages/Login';
import Portfolio from './pages/Portfolio';
import Signup from './pages/Signup';
import Search from './pages/Search';
import Stock from './pages/Stock';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/portfolio' element={<Portfolio />} />
        <Route path='/search' element={<Search />} />
        <Route path='/stock' element={<Stock />} />
      </Routes>
    </div>
  );
}

export default App;
