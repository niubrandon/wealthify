import Nav from 'react-bootstrap/Nav';
import { NavLink, useNavigate, Navigate } from 'react-router-dom';
import { RiTeamFill } from 'react-icons/ri';
import { GoSearch, GoGraph, GoEye } from 'react-icons/go';
import { BiTrendingUp } from 'react-icons/bi';
import {FiUserPlus, FiLogIn, FiLogOut} from 'react-icons/fi'
import '../styles/components/navbar.scss';

const NavBar = (props) => {
  const { authUser } = props;
  let navigate = useNavigate();

  const onLogout = (e) => {
    navigate('/');
    localStorage.clear();
    props.setAuthUser(null);
    props.setAccount(null);
  };

  return (
    <Nav variant='pills' className='nav-container' data-testid="nav-bar">
      <div className='links'>
        <div className='nav-title'>
          <h1>Wealthify</h1>
        </div>
        <NavLink to='/search' className='nav-item'>
          <GoSearch />
          <h2>Search</h2>
        </NavLink>
        <NavLink to={authUser ? '/portfolio' : '401'} className='nav-item'>
          <GoGraph />
          <h2>Portfolio</h2>
        </NavLink>
        <NavLink to={authUser ? '/watchlist' : '401'} className='nav-item'>
          <GoEye />
          <h2>Watchlist</h2>
        </NavLink>
        <NavLink to='/' className='nav-item'>
          <BiTrendingUp />
          <h2>Trending</h2>
        </NavLink>
        <NavLink to='/leaderboard' className='nav-item'>
          <RiTeamFill />
          <h2>Leaderboard</h2>
        </NavLink>
      </div>
      <div className='actions'>
        {props.authUser && (
          <>
            <div data-testid="nav-bar-welcome">
              Welcome, <br />
              {props.authUser.user_email}
            </div>
            <NavLink onClick={onLogout} to='/' className='userauth'>
              <FiLogOut className='icon'/>
              <h3>Logout</h3>
            </NavLink>
          </>
        )}
        {!props.authUser && (
          <>
            <NavLink to='/login' className='userauth'>
              <FiLogIn className='icon'/>
              <h3>Login</h3>
            </NavLink>
            <NavLink to='/signup' className='userauth'>
              <FiUserPlus className='icon'/>
              <h3>Sign Up</h3>
            </NavLink>
          </>
        )}
      </div>
    </Nav>
  );
};

export default NavBar;
