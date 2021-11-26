import Nav from 'react-bootstrap/Nav';
import { NavLink, useNavigate, Navigate } from 'react-router-dom';
import { RiTeamFill } from 'react-icons/ri';
import { GoSearch, GoGraph } from 'react-icons/go';
import { BiTrendingUp } from 'react-icons/bi';
import '../styles/components/navbar.scss';

const NavBar = (props) => {
  let navigate = useNavigate();

  const onLogout = (e) => {
    navigate('/');
    localStorage.clear();
    props.setAuthUser(null);
    props.setAccount(null);
  };

  return (
    <>
      <Nav variant='pills' className='flex-column nav-container'>
        <div className='links'>
          <div className='nav-title'>
            <h1>Wealthify</h1>
          </div>
          <NavLink to='/portfolio' className='nav-item'>
            <GoGraph />
            <h2>Portfolio</h2>
          </NavLink>
          <NavLink to='/search' className='nav-item'>
            <GoSearch />
            <h2>Search</h2>
          </NavLink>
          <NavLink to='/' className='nav-item'>
            <BiTrendingUp />
            <h2>Trending</h2>
          </NavLink>
          <NavLink to='/leaderboard' className='nav-item'>
            <RiTeamFill />
            <h2>Leaderboard</h2>
          </NavLink>
          <NavLink to='/watchlist' className='nav-item'>
            <RiTeamFill />
            <h2>Watchlist</h2>
          </NavLink>
        </div>
        <div className='actions'>
          {props.authUser && (
            <>
              <p>
                Welcome, <br />
                {props.authUser.user_email}
              </p>
              <NavLink onClick={onLogout} to='/' className='userauth'>
                <h3>Logout</h3>
              </NavLink>
            </>
          )}
          {!props.authUser && (
            <>
              <NavLink to='/login' className='userauth'>
                <h3>Login</h3>
              </NavLink>
              <NavLink to='/signup' className='userauth'>
                <h3>Sign Up</h3>
              </NavLink>
            </>
          )}
        </div>
      </Nav>
    </>
  );
};

export default NavBar;
