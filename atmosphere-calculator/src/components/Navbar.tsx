import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar as BSNavbar, Container, Nav } from 'react-bootstrap';

const Navbar: FC = () => {
  const location = useLocation();

  return (
    <BSNavbar bg="dark" variant="dark" expand="lg" className="mb-0" style={{ backgroundColor: '#ffffff' }}>
      <Container>
        <BSNavbar.Brand as={Link} to="/" style={{ fontSize: '1.5rem', fontWeight: '700' }}>
          🌡️ AtmosphericTempCalc
        </BSNavbar.Brand>
        <BSNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BSNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              as={Link}
              to="/"
              active={location.pathname === '/'}
            >
              Главная
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/gases"
              active={location.pathname === '/gases'}
            >
              Услуги (Газы)
            </Nav.Link>
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
};

export default Navbar;
