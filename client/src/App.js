import { Routes, Route, Link } from "react-router-dom";
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
import StockGraph from "./components/StockGraph";

function App() {

  return (
    <div className="App">
      <Nav />
        <h1>Welcome to React Router!</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/search" element={<Search />} />
        <Route path="/stock" element={<Stock />} />
        <Route path="/stockgraph" element={<StockGraph />} /> 
      </Routes>
    </div>
  );
}


export default App;
