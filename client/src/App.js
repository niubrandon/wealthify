import { useEffect, useState, createContext } from 'react';

import { Routes, Route } from 'react-router-dom';

import './App.scss';
import React from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Portfolio from './pages/Portfolio';
import Signup from './pages/Signup';
import Search from './pages/Search';
import Stock from './pages/Stock';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar';
import Leaderboard from './pages/Leaderboard';
import Watchlist from './pages/Watchlist';
import NoUser from './pages/NoUser';
import { Container, Row, Col } from 'react-bootstrap';

let AuthContext = React.createContext();

function App() {
  //authUser set to null when it is logout, set to jwt when it's login
  const [authUser, setAuthUser] = useState(null);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setAuthUser(JSON.parse(localStorage.getItem('auth')));
    }
  }, []);

  useEffect(() => {
    console.log(`%%%%%%%verify state from homepage ${authUser}%%%%%%%%%`);
    console.log('authUser', authUser);
  }, [authUser]);

  return (
    <>
      <Container fluid>
        <Row>
          <Col xs={2} className='nav-column'>
            <NavBar authUser={authUser} setAuthUser={setAuthUser} />
          </Col>
          <Col xs={10}>
            <Routes>
              <Route
                path='/'
                element={<Home authUser={authUser} setAuthUser={setAuthUser} />}
              />
              <Route
                path='/login'
                element={
                  <Login authUser={authUser} setAuthUser={setAuthUser} />
                }
              />
              <Route
                path='/signup'
                element={
                  <Signup authUser={authUser} setAuthUser={setAuthUser} />
                }
              />
              <Route
                path='portfolio'
                element={
                  <Portfolio
                    authUser={authUser}
                    setAuthUser={setAuthUser}
                    account={account}
                    setAccount={setAccount}
                  />
                }
              />
              <Route
                path='watchlist'
                element={
                <Watchlist
                  authUser={authUser}
                  setAuthUser={setAuthUser}
                  account={account}
                  setAccount={setAccount}
                />}
              />
              <Route
                path='leaderboard'
                element={
                  <Leaderboard
                    authUser={authUser}
                    setAuthUser={setAuthUser}
                    account={account}
                    setAccount={setAccount}
                  />
                }
              />
              <Route path='search' element={<Search authUser={authUser} />} />
              <Route path='stock'>
                <Route
                  path=':name'
                  element={
                    <Stock
                      authUser={authUser}
                      setAuthUser={setAuthUser}
                      account={account}
                      setAccount={setAccount}
                    />
                  }
                />
              </Route>
              <Route path='401' element={<NoUser />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
