import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearErrors } from '../slices/userSlice';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Card, CardBody, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import { FaBuilding } from 'react-icons/fa';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, error } = useSelector((state) => state.user);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(clearErrors());
        dispatch(loginUser({ userEmail: email, userPassword: password }))
            .unwrap()
            .then(() => {
                navigate('/dashboard');
            })
            .catch(() => {
                // Error handled in Redux state
            });
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100 bg-light-subtle">
            <Row className="w-100 justify-content-center">
                <Col md={6} lg={5}>
                    <div className="text-center mb-4">
                        <FaBuilding size={40} className="mb-2" />
                        <h3>SmartEstate</h3>
                    </div>
                    <Card className="shadow border-0 rounded-4">
                        <div className="card-header bg-transparent border-0 text-center pt-4 pb-0">
                            <div className="btn-group w-50" role="group">
                                <Button color="white" className="fw-bold active border-bottom border-dark rounded-0">Login</Button>
                                <Button color="light" tag={Link} to="/register" className="text-muted border-0 rounded-0">Sign Up</Button>
                            </div>
                        </div>
                        <CardBody className="p-5">
                            <h4 className="card-title fw-bold mb-1">Welcome Back</h4>
                            <p className="text-muted mb-4">Enter your credentials to access your account</p>

                            {error && <Alert color="danger">{error}</Alert>}

                            <Form onSubmit={handleSubmit}>
                                <FormGroup className="mb-3">
                                    <Label className="fw-bold small">Email</Label>
                                    <Input
                                        type="email"
                                        placeholder="john@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="bg-light border-0 py-2"
                                        required
                                        data-testid="x"
                                    />
                                </FormGroup>
                                <FormGroup className="mb-4">
                                    <Label className="fw-bold small">Password</Label>
                                    <Input
                                        type="password"
                                        placeholder="........"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="bg-light border-0 py-2"
                                        required
                                    />
                                </FormGroup>

                                <Button color="dark" block type="submit" className="w-100 py-2 fw-bold" disabled={status === 'loading'}>
                                    {status === 'loading' ? 'Loading...' : 'Login'}
                                </Button>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;