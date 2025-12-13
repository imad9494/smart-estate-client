import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Card, CardBody, Form, FormGroup, Label, Input, Button, Row, Col, Alert } from 'reactstrap';
import Header from './Header';
import { applyForProperty } from '../slices/applicationSlice';

const ApplicationForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const property = useSelector((state) => state.properties.list.find((p) => p._id === id));

    const [formData, setFormData] = useState({
        fullName: user ? user.userName : '',
        email: user ? user.userEmail : '',
        phone: '',
        offerPrice: property ? property.rent : '',
        moveInDate: '',
        additionalComments: ''
    });

    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            setError("You must be logged in to apply.");
            return;
        }

        const applicationData = {
            propertyId: id,
            applicantEmail: user.userEmail,
            ...formData
        };

        try {
            await dispatch(applyForProperty(applicationData)).unwrap();
            alert("Application Submitted Successfully!");
            navigate('/properties');
        } catch (err) {
            setError("Failed to submit application. Please try again.");
            console.error(err);
        }
    };

    if (!property) {
        return (
            <div>
                <Header />
                <Container className="text-center py-5">
                    <p>Property details not found. Please return to listings.</p>
                    <Button onClick={() => navigate('/properties')}>Back to Listings</Button>
                </Container>
            </div>
        );
    }

    return (
        <div className="bg-light pb-5" style={{ minHeight: '100vh' }}>
            <Header />
            <Container className="py-4">
                <Button color="link" className="text-dark text-decoration-none mb-3 p-0" onClick={() => navigate(-1)}>
                    &larr; Back to Property
                </Button>

                <div className="d-flex justify-content-center">
                    <Card className="border-0 shadow-sm rounded-4 w-100" style={{ maxWidth: '800px' }}>
                        <CardBody className="p-4 p-md-5">
                            <h3 className="mb-4">Rental Application</h3>
                            <p className="text-muted mb-4">Apply to rent: <strong>{property.title}</strong></p>
                            <p className="mb-4">Monthly Rent: <strong>${property.rent}</strong></p>

                            {error && <Alert color="danger">{error}</Alert>}

                            <Form onSubmit={handleSubmit}>
                                <h5 className="mb-3">Personal Information</h5>
                                <Row>
                                    <Col md={12}>
                                        <FormGroup>
                                            <Label for="fullName" className="fw-bold">Full Name *</Label>
                                            <Input
                                                type="text"
                                                name="fullName"
                                                id="fullName"
                                                placeholder="John Doe"
                                                value={formData.fullName}
                                                onChange={handleChange}
                                                required
                                                className="bg-light border-0 py-2"
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={12}>
                                        <FormGroup>
                                            <Label for="email" className="fw-bold">Email Address *</Label>
                                            <Input
                                                type="email"
                                                name="email"
                                                id="email"
                                                placeholder="name@example.com"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="bg-light border-0 py-2"
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={12}>
                                        <FormGroup>
                                            <Label for="phone" className="fw-bold">Phone Number *</Label>
                                            <Input
                                                type="tel"
                                                name="phone"
                                                id="phone"
                                                placeholder="+1 (555) 000-0000"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                                className="bg-light border-0 py-2"
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <h5 className="mb-3 mt-4">Application Details</h5>
                                <Row>
                                    <Col md={12}>
                                        <FormGroup>
                                            <Label for="offerPrice" className="fw-bold">Offer Price (Monthly) *</Label>
                                            <Input
                                                type="number"
                                                name="offerPrice"
                                                id="offerPrice"
                                                value={formData.offerPrice}
                                                onChange={handleChange}
                                                required
                                                className="bg-light border-0 py-2"
                                            />
                                            <small className="text-muted">Listed price: ${property.rent}/month</small>
                                        </FormGroup>
                                    </Col>
                                    <Col md={12}>
                                        <FormGroup>
                                            <Label for="moveInDate" className="fw-bold">Desired Move-in Date *</Label>
                                            <Input
                                                type="date"
                                                name="moveInDate"
                                                id="moveInDate"
                                                value={formData.moveInDate}
                                                onChange={handleChange}
                                                required
                                                className="bg-light border-0 py-2"
                                            />
                                            <small className="text-muted">Property available from: {new Date(property.availableFrom).toLocaleDateString()}</small>
                                        </FormGroup>
                                    </Col>
                                    <Col md={12}>
                                        <FormGroup>
                                            <Label for="additionalComments" className="fw-bold">Additional Comments</Label>
                                            <Input
                                                type="textarea"
                                                name="additionalComments"
                                                id="additionalComments"
                                                rows="4"
                                                placeholder="Tell the landlord about yourself, your employment, why you're interested in this property, etc."
                                                value={formData.additionalComments}
                                                onChange={handleChange}
                                                className="bg-light border-0 py-2"
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <div className="mt-4 p-3 bg-white rounded-3 border">
                                    <h6 className="mb-3">Application Summary</h6>
                                    <div className="d-flex justify-content-between mb-2 small text-muted">
                                        <span>Property:</span>
                                        <span className="text-dark">{property.title}</span>
                                    </div>
                                    <div className="d-flex justify-content-between mb-2 small text-muted">
                                        <span>Location:</span>
                                        <span className="text-dark">{property.address.city}, {property.address.state}</span>
                                    </div>
                                    <div className="d-flex justify-content-between mb-2 small text-muted">
                                        <span>Listed Rent:</span>
                                        <span className="text-dark">${property.rent}/month</span>
                                    </div>
                                    <div className="d-flex justify-content-between mb-0 small text-muted">
                                        <span>Your Offer:</span>
                                        <span className="fw-bold text-dark">${formData.offerPrice || 0}/month</span>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between mt-4">
                                    <Button color="white" className="border text-dark px-4" onClick={() => navigate(-1)}>Cancel</Button>
                                    <Button color="dark" type="submit" className="px-5">Submit Application</Button>
                                </div>
                            </Form>
                        </CardBody>
                    </Card>
                </div>
            </Container>
        </div>
    );
};

export default ApplicationForm;
