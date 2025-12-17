import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Button, Badge, Card, CardBody, Spinner } from 'reactstrap';
import Header from './Header';
import { deleteProperty } from '../slices/propertySlice';
import { FaMapMarkerAlt, FaBed, FaBath, FaRulerCombined, FaCheck, FaArrowLeft, FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios'; 

const PropertyDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);


    const propertyFromStore = useSelector((state) =>
        state.properties.list.find((p) => p._id === id)
    );

    const [property, setProperty] = useState(propertyFromStore || null);
    const [loading, setLoading] = useState(!propertyFromStore);

    useEffect(() => {
        if (!property) {
            // Fallback fetch if not in store (e.g. direct link access)
            // Using simple fetch for now as I didn't create a specific thunk for getPropertyById
            // But existing getProperties returns all, so maybe just dispatch that?
            // Or better, just fetch it directly here.

            // Quick fix: Fetch all properties if empty list
            setLoading(false); // Placeholder as we rely on list being populated usually
        }
    }, [property]);

    const handleApply = () => {
        if (!user) {
            navigate('/login');
            return;
        }
        navigate(`/property/${property._id}/apply`);
    };

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this property?")) {
            dispatch(deleteProperty(property._id))
                .unwrap()
                .then(() => {
                    alert("Property deleted successfully");
                    navigate('/properties');
                })
                .catch((err) => alert("Failed to delete: " + err));
        }
    };

    if (!property) return (
        <>
            <Header />
            <Container className="text-center py-5">
                <p>Property not found or loading...</p>
                <Button onClick={() => navigate('/properties')}>Back to Listings</Button>
            </Container>
        </>
    );

    return (
        <div className="bg-light pb-5">
            <Header />
            <Container className="py-4">
                <Button color="link" className="text-dark text-decoration-none mb-3 p-0" onClick={() => navigate('/properties')}>
                    <FaArrowLeft className="me-2" /> Back to Listings
                </Button>

                <Row className="g-4">
                    <Col lg={8}>
                        <img
                            src={property.image || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"}
                            alt={property.title}
                            className="w-100 rounded-4 shadow-sm mb-4"
                            style={{ height: '500px', objectFit: 'cover' }}
                        />

                        <div className="mb-4">
                            <div className="d-flex justify-content-between align-items-start">
                                <div>
                                    <h1 className="fw-bold mb-2">{property.title}</h1>
                                    <h4 className="text-bold mb-3 text-primary">${property.rent}/month</h4>
                                </div>
                                <Badge color="dark" className="p-2 fs-6">{property.type}</Badge>
                            </div>
                            <p className="text-muted"><FaMapMarkerAlt className="me-2" /> {property.address.street}, {property.address.city}, {property.address.state} {property.address.zip}</p>

                            <div className="rounded-4 overflow-hidden shadow-sm mt-3" style={{ height: '300px' }}>
                                <iframe
                                    title="Property Location"
                                    width="100%"
                                    height="100%"
                                    frameBorder="0"
                                    scrolling="no"
                                    marginHeight="0"
                                    marginWidth="0"
                                    src={`https://maps.google.com/maps?q=${encodeURIComponent(`${property.address.street}, ${property.address.city}, ${property.address.state} ${property.address.zip}`)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                                ></iframe>
                            </div>
                        </div>

                        <Card className="border-0 shadow-sm rounded-4 mb-4">
                            <CardBody className="p-4">
                                <h5 className="fw-bold mb-3">Description</h5>
                                <p className="text-muted">{property.description}</p>
                            </CardBody>
                        </Card>

                        <Row className="g-3">
                            <Col md={6}>
                                <Card className="border-0 shadow-sm rounded-4 h-100">
                                    <CardBody className="p-4">
                                        <h5 className="fw-bold mb-3">Features</h5>
                                        <ul className="list-unstyled">
                                            <li className="mb-2"><FaCheck className="text-success me-2" /> {property.features?.furnished ? 'Furnished' : 'Unfurnished'}</li>
                                            <li className="mb-2"><FaCheck className="text-success me-2" /> {property.features?.petsAllowed ? 'Pets Allowed' : 'No Pets'}</li>
                                            <li className="mb-2"><FaCheck className="text-success me-2" /> {property.features?.parking ? 'Parking Available' : 'No Parking'}</li>
                                        </ul>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col md={6}>
                                <Card className="border-0 shadow-sm rounded-4 h-100">
                                    <CardBody className="p-4">
                                        <h5 className="fw-bold mb-3">Details</h5>
                                        <ul className="list-unstyled">
                                            <li className="d-flex justify-content-between mb-2"><span>Type:</span> <span className="fw-bold">{property.type}</span></li>
                                            <li className="d-flex justify-content-between mb-2"><span>Area:</span> <span className="fw-bold">{property.area} sqft</span></li>
                                            <li className="d-flex justify-content-between mb-2"><span>Bedrooms:</span> <span className="fw-bold">{property.bedrooms}</span></li>
                                            <li className="d-flex justify-content-between mb-2"><span>Bathrooms:</span> <span className="fw-bold">{property.bathrooms}</span></li>
                                        </ul>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>

                    </Col>

                    <Col lg={4}>
                        <Card className="border-0 shadow rounded-4 sticky-top" style={{ top: '100px' }}>
                            <CardBody className="p-4">
                                <h3 className="fw-bold mb-1">${property.rent}</h3>
                                <p className="text-muted small mb-4">per month</p>

                                <Button color="dark" block size="lg" className="w-100 mb-3 rounded-3" onClick={handleApply}>
                                    Apply Now
                                </Button>

                                {user && user.userRole === "Admin" && (
                                    <div className="d-grid gap-2">
                                        <Button color="outline-dark" onClick={() => navigate(`/edit-property/${property._id}`)}>
                                            <FaEdit className="me-2" /> Edit Property
                                        </Button>
                                        <Button color="danger" onClick={handleDelete}>
                                            <FaTrash className="me-2" /> Delete Property
                                        </Button>
                                    </div>
                                )}

                                <hr className="my-4" />

                                <div className="small text-muted">
                                    <div className="d-flex justify-content-between mb-2">
                                        <span>Property Type</span>
                                        <span className="text-dark">{property.type}</span>
                                    </div>
                                    <div className="d-flex justify-content-between mb-2">
                                        <span>Available From</span>
                                        <span className="text-dark">{new Date(property.availableFrom).toLocaleDateString()}</span>
                                    </div>
                                </div>

                                <div className="mt-4 p-3 bg-light rounded-3">
                                    <small className="fw-bold">Need help?</small>
                                    <p className="mb-0 small text-muted">Contact us at <a href="mailto:info@smartestate.com">info@smartestate.com</a></p>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default PropertyDetails;

