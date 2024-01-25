import { useContext, useState, useRef, useEffect } from 'react';
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import UserContext from '../UserContext';

export default function AppNavBar() {
  const { user } = useContext(UserContext);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const navbarRef = useRef(null);

  const closeNavbar = () => {
    setIsNavbarOpen(false);
  };

  const handleNavbarClick = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const handleDocumentClick = (e) => {
    if (navbarRef.current && !navbarRef.current.contains(e.target)) {
      setIsNavbarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  return (
    <Navbar
      bg="warning"
      expand="lg"
      className="navbar-custom"
      expanded={isNavbarOpen}
      ref={navbarRef}
    >
      <Container fluid>
        <Navbar.Brand as={NavLink} to="/" exact>
          Pet<span style={{ color: 'orangered' }}>Bili</span>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={handleNavbarClick}
        />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="ml-auto">
            <Nav.Link as={NavLink} to="/" exact onClick={closeNavbar}>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/products" exact onClick={closeNavbar}>
              Products
            </Nav.Link>
            {user.id !== null ? (
              <>
                <Nav.Link as={NavLink} to="#" className="disabled" disabled>
                  {user.name}
                </Nav.Link>
                <NavDropdown title="Menu" id="basic-nav-dropdown">
                  <NavDropdown.Item as={NavLink} to="/profile" exact onClick={closeNavbar}>
                    Profile
                  </NavDropdown.Item>
                  {user.isAdmin && (
                    <>
                      <NavDropdown.Item as={NavLink} to="/adminorders" exact onClick={closeNavbar}>
                        Orders
                      </NavDropdown.Item>
                      <NavDropdown.Item as={NavLink} to="/AddProduct" exact onClick={closeNavbar}>
                        Add Product
                      </NavDropdown.Item>
                    </>
                  )}
                  {!user.isAdmin && (
                    <NavDropdown.Item as={NavLink} to="/orders" exact onClick={closeNavbar}>
                      Orders
                    </NavDropdown.Item>
                  )}
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={NavLink} to="/logout" exact onClick={closeNavbar}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login" exact onClick={closeNavbar}>
                  Login
                </Nav.Link>
                <Nav.Link as={NavLink} to="/register" exact onClick={closeNavbar}>
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
