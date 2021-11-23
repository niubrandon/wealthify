import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";


const NavBar = (props) => {
  console.log("print from navbar", props.authUser)

  const onLogout = ((e) => {
    props.setAuthUser(null)
  });

  return (
    <>
      <Nav variant="pills" className="flex-column">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/search">Search</NavLink>
        <NavLink to="/portfolio">Portfolio</NavLink>
        { props.authUser ? <NavLink onClick={onLogout} to="/">Logout</NavLink> : <NavLink to="/login">Login</NavLink>}
        {!props.authUser && <NavLink to="/signup">SignUp</NavLink>}
        {props.authUser && <p>Logged in as {props.authUser.user_email}</p>}
      </Nav>
    </>
  );
};

export default NavBar;
