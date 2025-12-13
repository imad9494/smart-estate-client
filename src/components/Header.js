import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container,
    Input,
    Button
} from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slices/userSlice';
import { fetchProperties } from '../slices/propertySlice';
import { FaBuilding } from 'react-icons/fa';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const { user, isAuthenticated } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const toggle = () => setIsOpen(!isOpen);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(fetchProperties(searchTerm));
        navigate('/properties');
    }

    return (
        <div>
            <Navbar color="light" light expand="md" className="shadow-sm py-3">
                <Container>
                    <NavbarBrand tag={Link} to="/" className="d-flex align-items-center fw-bold">
                        <FaBuilding className="me-2" size={24} /> SmartEstate
                    </NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="me-auto" navbar>
                            <NavItem>
                                <NavLink tag={Link} to="/">Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to="/properties">Properties</NavLink>
                            </NavItem>
                            {isAuthenticated && (
                                <>
                                    <NavItem>
                                        <NavLink tag={Link} to="/dashboard">Dashboard</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} to="/my-applications">My Applications</NavLink>
                                    </NavItem>
                                </>
                            )}
                        </Nav>

                        <form onSubmit={handleSearch} className="d-flex mx-auto w-50" role="search">
                            <Input
                                type="search"
                                placeholder="Search by city, type..."
                                className="me-2 rounded-pill"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </form>

                        <Nav navbar>
                            {isAuthenticated ? (
                                <div className="d-flex align-items-center">
                                    <span className="me-3 fw-bold text-secondary">{user?.userName || "User"}</span>
                                    <Button outline color="dark" size="sm" onClick={handleLogout}>Logout</Button>
                                </div>
                            ) : (
                                <>
                                    <NavItem>
                                        <NavLink tag={Link} to="/login">Login</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <Button color="dark" tag={Link} to="/register" className="ms-2">Sign Up</Button>
                                    </NavItem>
                                </>
                            )}
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default Header;
