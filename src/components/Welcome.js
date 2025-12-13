import React from "react";
import { Button, Form, FormGroup, Input, InputGroup } from "reactstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../slices/userSlice";
import "./Welcome.css";
import logo from "../images/logo.png";


export default function Welcome() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    return (
        <div className="welcome-container">
            <header className="d-flex justify-content-between align-items-center p-3 px-5 border-bottom">
                <div className="logo d-flex align-items-center">
                    <img src={logo} alt="SmartEstate" width="30" height="30" className="me-2" />
                    <span className="fs-4 fw-bold text-white">SmartEstate</span>
                </div>
                <nav>
                    <ul className="list-inline d-flex gap-3">
                        <li><a href="#" className="text-white text-decoration-none">Home</a></li>
                        <li><a href="#" className="text-white text-decoration-none">Properties</a></li>
                        <li><a href="#" className="text-white text-decoration-none">Dashboard</a></li>
                        <li><a href="#" className="text-white text-decoration-none">My Applications</a></li>
                    </ul>
                </nav>
                <div className="user-profile d-flex align-items-center">
                    <span className="me-3 text-white">John Doe</span>
                    <Button outline color="light" onClick={handleLogout}>Logout</Button>
                </div>
            </header>
            <main className="d-flex justify-content-center align-items-center text-center h-75">
                <section className="hero">
                    <h1 className="display-4 mb-3 text-white">Find Your Perfect Rental Home</h1>
                    <p className="fs-5 mb-5 text-white">Discover thousands of properties for rent. Easy, fast, and secure rental experience.</p>
                    <Form>
                        <FormGroup className="d-flex justify-content-center mb-5">
                            <InputGroup className="w-50">
                                <Input type="text" placeholder="Search by city, neighborhood, or property type..." />
                                <Button color="dark">Search</Button>
                            </InputGroup>
                        </FormGroup>
                    </Form>
                    <div className="cta-buttons">
                        <Button color="dark" className="me-3 px-4 py-2">View Properties</Button>
                        <Button color="light" className="px-4 py-2">List Your Property</Button>
                    </div>
                </section>
            </main>
        </div>
    )
}
