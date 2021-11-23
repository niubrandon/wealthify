import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Container } from "react-bootstrap";

const NavBar = (props) => {
  return (
    <>
      <Nav variant="pills" className="flex-column">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/search">Search</Nav.Link>
        <Nav.Link href="/portfolio">Portfolio</Nav.Link>
        <Nav.Link href="/login">Login</Nav.Link>
        <Nav.Link href="/signup">Signup</Nav.Link>
      </Nav>
    </>
  );
};

export default NavBar;
