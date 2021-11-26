import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

const NavBar = (props) => {
  console.log("print from navbar", props.authUser);

  const onLogout = ((e) => {
    localStorage.clear()
    props.setAuthUser(null)
    props.setAccount(null)
    
  });

  return (
    <>
      <Nav variant="pills" className="flex-column">
        <NavLink to="/">Home</NavLink>

        <NavLink to="/search">Search</NavLink>

        <NavLink to="/leaderboard">Leaderboard</NavLink>

        <NavLink to="/portfolio">Portfolio</NavLink>

        {props.authUser ? <NavLink to="/watchlist">Watchlist</NavLink> : null}

        {props.authUser ? (
          <NavLink onClick={onLogout} to="/">
            Logout
          </NavLink>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}

        {!props.authUser && <NavLink to="/signup">SignUp</NavLink>}

        {props.authUser && <p>Logged in as {props.authUser.user_email}</p>}
      </Nav>
    </>
  );
};

export default NavBar;
