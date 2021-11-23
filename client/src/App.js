import { useEffect, useState, createContext } from 'react';
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


let AuthContext = React.createContext();

function App() {
  //authUser set to null when it is logout, set to jwt when it's login
  const [ authUser, setAuthUser ] = useState(null);
  const [ account, setAccount ] = useState(null)
  useEffect(() => {
    console.log(`%%%%%%%verify state from homepage ${ authUser }%%%%%%%%%`)
    console.log('authUser', authUser);
  },[authUser])


  return (
    <div className='App'>
      <NavBar authUser={authUser} setAuthUser={setAuthUser} />
      {/* <Sidebar /> */}
      <Routes>
        <Route path='/' element={<Home authUser={authUser} setAuthUser={setAuthUser} />} />
        <Route path="/login" element={<Login authUser={authUser} setAuthUser={setAuthUser} />} />
        <Route path="/signup" element={<Signup authUser={authUser} setAuthUser={setAuthUser} />} />
        <Route path='portfolio' element={<Portfolio authUser={authUser} setAuthUser={setAuthUser} account={account} setAccount={setAccount} />} />
        <Route path='search' element={<Search authUser={authUser} />} />
        <Route path='stock'>
          <Route path=':name' element={<Stock authUser={authUser} />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
