import React from 'react';
import { Card, CardBody, CardImg, CardTitle, CardSubtitle, Button, Badge } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { FaBed, FaBath, FaRulerCombined } from 'react-icons/fa';

const PropertyCard = ({ property }) => {
    const navigate = useNavigate();

    return (
        <Card className="shadow-sm border-0 h-100 rounded-4 overflow-hidden">
            <div className="position-relative">
                <CardImg
                    top
                    width="100%"
                    src={property.image || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
                    alt={property.title}
                    style={{ height: '250px', objectFit: 'cover' }}
                />
                <Badge color="dark" className="position-absolute top-0 end-0 m-3 p-2">{property.type}</Badge>
            </div>
            <CardBody className="p-4">
                <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                        <CardTitle tag="h5" className="fw-bold mb-1">{property.title}</CardTitle>
                        <CardSubtitle className="mb-2 text-muted small">{property.address?.street}, {property.address?.city}</CardSubtitle>
                    </div>
                    <h5 className="fw-bold text-primary">${property.rent}<span className="text-muted small fw-normal">/mo</span></h5>
                </div>

                <div className="d-flex justify-content-between text-muted my-3 small border-top border-bottom py-2">
                    <span className="d-flex align-items-center"><FaBed className="me-1" /> {property.bedrooms} Bed</span>
                    <span className="d-flex align-items-center"><FaBath className="me-1" /> {property.bathrooms} Bath</span>
                    <span className="d-flex align-items-center"><FaRulerCombined className="me-1" /> {property.area} sqft</span>
                </div>

                <Button color="dark" outline block className="w-100 rounded-3" onClick={() => navigate(`/property/${property._id}`)}>
                    View Details
                </Button>
            </CardBody>
        </Card>
    );
};

export default PropertyCard;
