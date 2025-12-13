import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProperty, updateProperty } from '../slices/propertySlice';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col, Card, CardBody, Form, FormGroup, Label, Input, Button, FormText } from 'reactstrap';
import Header from './Header';

const AddProperty = () => {
    const { id } = useParams(); // Get ID for edit mode
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user);

    // Find property if editing
    const propertyToEdit = useSelector((state) =>
        id ? state.properties.list.find(p => p._id === id) : null
    );

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: '',
        type: 'Apartment',
        rent: '',
        area: '',
        bedrooms: '',
        bathrooms: '',
        availableFrom: '',
        address: { street: '', city: '', state: '', zip: '' },
        features: { furnished: false, petsAllowed: false, parking: false },
        amenities: []
    });

    const [mapUrl, setMapUrl] = useState('');

    // Populate form if editing
    React.useEffect(() => {
        if (id && propertyToEdit) {
            setFormData({
                title: propertyToEdit.title,
                description: propertyToEdit.description,
                image: propertyToEdit.image || '',
                type: propertyToEdit.type,
                rent: propertyToEdit.rent,
                area: propertyToEdit.area,
                bedrooms: propertyToEdit.bedrooms,
                bathrooms: propertyToEdit.bathrooms,
                availableFrom: propertyToEdit.availableFrom.split('T')[0], // Format date for input
                address: { ...propertyToEdit.address },
                features: { ...propertyToEdit.features },
                amenities: propertyToEdit.amenities || []
            });
        }
    }, [id, propertyToEdit]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: { ...prev[parent], [child]: value }
            }));
        } else if (type === 'checkbox' && name.startsWith('feature_')) {
            const featureName = name.replace('feature_', '');
            setFormData(prev => ({
                ...prev,
                features: { ...prev.features, [featureName]: checked }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    // Simple amenities handler
    const handleAmenityChange = (name) => {
        setFormData(prev => {
            const newAmenities = prev.amenities.includes(name)
                ? prev.amenities.filter(a => a !== name)
                : [...prev.amenities, name];
            return { ...prev, amenities: newAmenities };
        });
    };

    const handleGetLocation = () => {
        const { street, city, state, zip } = formData.address;
        if (street && city) {
            const addressString = `${street}, ${city}, ${state} ${zip}`;
            const encodedAddress = encodeURIComponent(addressString);
            setMapUrl(`https://maps.google.com/maps?q=${encodedAddress}&t=&z=13&ie=UTF8&iwloc=&output=embed`);
        } else {
            alert("Please enter at least Street and City to get location.");
        }
    };

    const handleGetUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setMapUrl(`https://maps.google.com/maps?q=${latitude},${longitude}&t=&z=13&ie=UTF8&iwloc=&output=embed`);
                },
                (error) => {
                    alert("Error getting location: " + error.message);
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!user) {
            alert("Please login first");
            return;
        }

        const action = id
            ? updateProperty({ id, propertyData: { ...formData, ownerEmail: user.userEmail } })
            : addProperty({ ...formData, ownerEmail: user.userEmail });

        dispatch(action)
            .unwrap()
            .then(() => {
                alert(id ? "Property Updated Successfully!" : "Property Listed Successfully!");
                navigate('/properties');
            })
            .catch((err) => alert("Failed to save property: " + err));
    };

    // Amenities List
    const amenitiesList = ["Gym", "Pool", "Doorman", "Rooftop", "Backyard", "Garage", "Fireplace", "Laundry", "Wifi", "Spa", "Concierge"];

    return (
        <div className="bg-light pb-5">
            <Header />
            <Container className="py-5">
                <Row className="justify-content-center">
                    <Col md={10} lg={8}>
                        <Card className="shadow-sm border-0 rounded-4">
                            <CardBody className="p-5">
                                <h2 className="fw-bold mb-4">{id ? "Edit Property" : "Add New Property"}</h2>
                                <p className="text-muted mb-4">{id ? "Update your property details below" : "Fill in the details to list your property for rent"}</p>

                                <Form onSubmit={handleSubmit}>

                                    <h5 className="mb-3">Basic Information</h5>
                                    <FormGroup>
                                        <Label>Property Title *</Label>
                                        <Input type="text" name="title" onChange={handleChange} required placeholder="e.g., Modern Downtown Apartment" className="bg-light border-0" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Description *</Label>
                                        <Input type="textarea" name="description" onChange={handleChange} required rows={4} placeholder="Describe your property..." className="bg-light border-0" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Image URL</Label>
                                        <Input type="url" name="image" onChange={handleChange} placeholder="https://example.com/image.jpg" className="bg-light border-0" />
                                        <FormText color="muted">Leave empty to use a random placeholder image.</FormText>
                                    </FormGroup>
                                    <FormGroup tag="fieldset">
                                        <Label>Property Type *</Label>
                                        <FormGroup check>
                                            <Label check>
                                                <Input type="radio" name="type" value="Apartment" checked={formData.type === 'Apartment'} onChange={handleChange} />{' '}
                                                Apartment
                                            </Label>
                                        </FormGroup>
                                        <FormGroup check>
                                            <Label check>
                                                <Input type="radio" name="type" value="House" checked={formData.type === 'House'} onChange={handleChange} />{' '}
                                                House
                                            </Label>
                                        </FormGroup>
                                        <FormGroup check>
                                            <Label check>
                                                <Input type="radio" name="type" value="Condo" checked={formData.type === 'Condo'} onChange={handleChange} />{' '}
                                                Condo
                                            </Label>
                                        </FormGroup>
                                        <FormGroup check>
                                            <Label check>
                                                <Input type="radio" name="type" value="Studio" checked={formData.type === 'Studio'} onChange={handleChange} />{' '}
                                                Studio
                                            </Label>
                                        </FormGroup>
                                    </FormGroup>

                                    <h5 className="mt-5 mb-3">Property Details</h5>
                                    <Row>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label>Monthly Rent ($) *</Label>
                                                <Input type="number" name="rent" onChange={handleChange} required className="bg-light border-0" />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label>Area (sq ft) *</Label>
                                                <Input type="number" name="area" onChange={handleChange} required className="bg-light border-0" />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label>Bedrooms *</Label>
                                                <Input type="select" name="bedrooms" onChange={handleChange} required className="bg-light border-0">
                                                    <option value="">Select bedrooms</option>
                                                    <option>1</option><option>2</option><option>3</option><option>4</option><option>5+</option>
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label>Bathrooms *</Label>
                                                <Input type="select" name="bathrooms" onChange={handleChange} required className="bg-light border-0">
                                                    <option value="">Select bathrooms</option>
                                                    <option>1</option><option>1.5</option><option>2</option><option>2.5</option><option>3+</option>
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <FormGroup>
                                        <Label>Available From *</Label>
                                        <Input type="date" name="availableFrom" onChange={handleChange} required className="bg-light border-0" />
                                    </FormGroup>

                                    <h5 className="mt-5 mb-3">Location</h5>
                                    <FormGroup>
                                        <Label>Street Address *</Label>
                                        <Input type="text" name="address.street" onChange={handleChange} required placeholder="123 Main Street" className="bg-light border-0" />
                                    </FormGroup>
                                    <Row>
                                        <Col md={4}>
                                            <FormGroup>
                                                <Label>City *</Label>
                                                <Input type="text" name="address.city" onChange={handleChange} required placeholder="New York" className="bg-light border-0" />
                                            </FormGroup>
                                        </Col>
                                        <Col md={4}>
                                            <FormGroup>
                                                <Label>State *</Label>
                                                <Input type="text" name="address.state" onChange={handleChange} required placeholder="NY" className="bg-light border-0" />
                                            </FormGroup>
                                        </Col>
                                        <Col md={4}>
                                            <FormGroup>
                                                <Label>ZIP Code *</Label>
                                                <Input type="text" name="address.zip" onChange={handleChange} required placeholder="10001" className="bg-light border-0" />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <div className="mb-4">
                                        <div className="d-flex gap-2 mb-3">
                                            <Button color="dark" outline onClick={handleGetLocation} type="button">
                                                Get Location
                                            </Button>
                                            <Button color="outline-primary" onClick={handleGetUserLocation} type="button">
                                                Get Your Location
                                            </Button>
                                        </div>
                                        {mapUrl && (
                                            <div className="rounded-4 overflow-hidden shadow-sm">
                                                <iframe
                                                    title="Property Location"
                                                    width="100%"
                                                    height="300"
                                                    frameBorder="0"
                                                    scrolling="no"
                                                    marginHeight="0"
                                                    marginWidth="0"
                                                    src={mapUrl}
                                                ></iframe>
                                            </div>
                                        )}
                                    </div>

                                    <h5 className="mt-5 mb-3">Features</h5>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="checkbox" name="feature_furnished" onChange={handleChange} />{' '}
                                            Furnished
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="checkbox" name="feature_petsAllowed" onChange={handleChange} />{' '}
                                            Pets Allowed
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="checkbox" name="feature_parking" onChange={handleChange} />{' '}
                                            Parking Available
                                        </Label>
                                    </FormGroup>

                                    <h5 className="mt-4 mb-3">Amenities</h5>
                                    <Row>
                                        {amenitiesList.map((amenity) => (
                                            <Col md={4} key={amenity}>
                                                <FormGroup check>
                                                    <Label check>
                                                        <Input type="checkbox" onChange={() => handleAmenityChange(amenity)} />{' '}
                                                        {amenity}
                                                    </Label>
                                                </FormGroup>
                                            </Col>
                                        ))}
                                    </Row>

                                    <div className="d-flex justify-content-end mt-5">
                                        <Button color="light" className="me-3" onClick={() => navigate('/properties')}>Cancel</Button>
                                        <Button color="dark" type="submit" className="px-4">{id ? "Update Property" : "Add Property"}</Button>
                                    </div>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default AddProperty;
