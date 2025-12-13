import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProperties } from '../slices/propertySlice';
import { Container, Row, Col, Spinner, Alert } from 'reactstrap';
import PropertyCard from './PropertyCard';
import Header from './Header';

const Properties = () => {
    const dispatch = useDispatch();
    const { list, status, error } = useSelector((state) => state.properties);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProperties());
        }
    }, [status, dispatch]);

    return (
        <div className="bg-light min-vh-100 pb-5">
            <Header />
            <Container className="py-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="fw-bold">Browse Properties</h2>
                    <span className="text-muted">Showing {list.length} properties</span>
                </div>

                {status === 'loading' && <div className="text-center py-5"><Spinner color="dark" /></div>}
                {status === 'failed' && <Alert color="danger">{error}</Alert>}

                <Row>
                    {list.map((property) => (
                        <Col md={6} lg={4} className="mb-4" key={property._id}>
                            <PropertyCard property={property} />
                        </Col>
                    ))}
                    {status === 'succeeded' && list.length === 0 && (
                        <Col className="text-center py-5">
                            <h4>No properties found matching your criteria.</h4>
                        </Col>
                    )}
                </Row>
            </Container>
        </div>
    );
};

export default Properties;
