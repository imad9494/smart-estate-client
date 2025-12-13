import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearErrors } from '../slices/userSlice';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Card, CardBody, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import { FaBuilding } from 'react-icons/fa';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { registerStatus, registerError } = useSelector((state) => state.user);

    const [formData, setFormData] = useState({
        fullName: '',
        userEmail: '',
        pwd: '',
        confirmPwd: '',
        gender: 'Male',
        dob: '',
        dept: 'IT', // Legacy field
        profilePic: '',
        role: 'User'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.pwd !== formData.confirmPwd) {
            alert("Passwords do not match");
            return;
        }
        dispatch(clearErrors());
        dispatch(registerUser({
            ...formData,
            email: formData.userEmail // Mapping to backend expectation
        }))
            .unwrap()
            .then(() => {
                alert("Registration Successful");
                navigate('/login');
            })
            .catch(() => { });
    };

    return (
        <Container className="d-flex justify-content-center align-items-center py-5 bg-light-subtle" style={{ minHeight: '100vh' }}>
            <Row className="w-100 justify-content-center">
                <Col md={8} lg={6}>
                    <div className="text-center mb-4">
                        <FaBuilding size={40} className="mb-2" />
                        <h3>SmartEstate</h3>
                    </div>
                    <Card className="shadow border-0 rounded-4">
                        <div className="card-header bg-transparent border-0 text-center pt-4 pb-0">
                            <div className="btn-group w-50" role="group">
                                <Button color="light" tag={Link} to="/login" className="text-muted border-0 rounded-0">Login</Button>
                                <Button color="white" className="fw-bold active border-bottom border-dark rounded-0">Sign Up</Button>
                            </div>
                        </div>
                        <CardBody className="p-5">
                            <h4 className="card-title fw-bold mb-1">Create an Account</h4>
                            <p className="text-muted mb-4">Join us to find your perfect home</p>

                            {registerError && <Alert color="danger">{registerError}</Alert>}

                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col md={12}>
                                        <FormGroup>
                                            <Label>Full Name</Label>
                                            <Input type="text" name="fullName" onChange={handleChange} required className="bg-light border-0" />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <FormGroup>
                                    <Label>Email</Label>
                                    <Input type="email" name="userEmail" onChange={handleChange} required className="bg-light border-0" data-testid="email" />
                                </FormGroup>
                                <Row>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label>Password</Label>
                                            <Input type="password" name="pwd" onChange={handleChange} required className="bg-light border-0" />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label>Confirm Password</Label>
                                            <Input type="password" name="confirmPwd" onChange={handleChange} required className="bg-light border-0" />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label>Gender</Label>
                                            <Input type="select" name="gender" onChange={handleChange} className="bg-light border-0">
                                                <option>Male</option>
                                                <option>Female</option>

                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label>Date of Birth</Label>
                                            <Input type="date" name="dob" onChange={handleChange} required className="bg-light border-0" />
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Button color="dark" block type="submit" className="w-100 mt-4 py-2 fw-bold" disabled={registerStatus === 'loading'}>
                                    {registerStatus === 'loading' ? 'Registering...' : 'Sign Up'}
                                </Button>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Register;
