import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Navigation = () => (
    <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
            <Navbar.Brand as={Link} to="/">BNV Dashboard</Navbar.Brand>
            <Nav className="ms-auto">
                <Nav.Link as={Link} to="/">Users</Nav.Link>
                <Nav.Link as={Link} to="/register">Add User</Nav.Link>
            </Nav>
        </Container>
    </Navbar>
);

export default Navigation;