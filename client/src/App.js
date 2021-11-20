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
import Model from './components/Model';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
        <Route path='portfolio' element={<Portfolio />} />
        <Route path='search' element={<Search />} />
        <Route path='stock'>
          {/* <Route path=':name' element={<Stock />}>
            
            <Route path='buy' element={<Model />} />
            <Route path='sell' element={<Model />} />
          </Route> */}
          <Route path=':name' element={<Stock />} />
          <Route path=':name/buy' element={<Model />} />
          <Route path=':name/sell' element={<Model />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
