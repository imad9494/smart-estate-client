import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMyProperties, fetchProperties } from '../slices/propertySlice';
import { fetchMyApplications } from '../slices/applicationSlice';
import { Container, Row, Col, Card, CardBody, Button, Table, Spinner } from 'reactstrap';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaFileContract, FaPlusCircle, FaList } from 'react-icons/fa';

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user);
    const { myList, list, status: propStatus } = useSelector((state) => state.properties);
    const { myApplications, status: appStatus } = useSelector((state) => state.applications);

    useEffect(() => {
        if (!user) {
            navigate('/login');
        } else {
            dispatch(fetchMyProperties(user.userEmail));
            dispatch(fetchProperties());
            dispatch(fetchMyApplications(user.userEmail));
        }
    }, [dispatch, user, navigate]);

    if (!user) return null;

    return (
        <div className="bg-light min-vh-100">
            <Header />
            <Container className="py-5">
                <div className="mb-5">
                    <h2>Welcome back, {user.userName}!</h2>
                    <p className="text-muted">Manage your properties and applications from your dashboard</p>
                </div>

                <Row className="mb-5 g-4">
                    <Col md={4}>
                        <Card className="border-0 shadow-sm rounded-4 h-100 p-3">
                            <CardBody className="d-flex justify-content-between align-items-center">
                                <div>
                                    <p className="text-muted mb-1 small">My Properties</p>
                                    <h2 className="fw-bold mb-0">{myList.length}</h2>
                                    <small className="text-muted">Properties listed</small>
                                </div>
                                <div className="bg-light p-3 rounded-circle text-dark">
                                    <FaHome size={24} />
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="border-0 shadow-sm rounded-4 h-100 p-3">
                            <CardBody className="d-flex justify-content-between align-items-center">
                                <div>
                                    <p className="text-muted mb-1 small">My Applications</p>
                                    <h2 className="fw-bold mb-0">{myApplications.length}</h2>
                                    <small className="text-muted">Applications submitted</small>
                                </div>
                                <div className="bg-light p-3 rounded-circle text-dark">
                                    <FaFileContract size={24} />
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="border-0 shadow-sm rounded-4 h-100 p-3">
                            <CardBody className="d-flex justify-content-between align-items-center">
                                <div>
                                    <p className="text-muted mb-1 small">Total Properties</p>
                                    <h2 className="fw-bold mb-0">{list.length}</h2>
                                    <small className="text-muted">Available to browse</small>
                                </div>
                                <div className="bg-light p-3 rounded-circle text-dark">
                                    <FaList size={24} />
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                <Row className="g-4">
                    <Col lg={6}>
                        <Card className="shadow-sm border-0 rounded-4 h-100">
                            <CardBody className="p-4">
                                <h5 className="fw-bold mb-3">Property Management</h5>
                                <p className="text-muted mb-4">Add or manage your rental properties</p>
                                <Button color="dark" block className="w-100 mb-2 py-3 fw-bold rounded-2" onClick={() => navigate('/add-property')}>
                                    <FaPlusCircle className="me-2" /> Add New Property
                                </Button>
                                <Button color="white" block className="w-100 py-3 fw-bold border" onClick={() => navigate('/properties')}>
                                    <FaList className="me-2" /> View All Properties
                                </Button>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col lg={6}>
                        <Card className="shadow-sm border-0 rounded-4 h-100">
                            <CardBody className="p-4">
                                <h5 className="fw-bold mb-3">Applications</h5>
                                <p className="text-muted mb-4">View and manage your rental applications</p>
                                <Button color="dark" block className="w-100 mb-2 py-3 fw-bold rounded-2" onClick={() => navigate('/my-applications')}>
                                    <FaFileContract className="me-2" /> {user.userRole === 'Admin' ? "Applications" : `My Applications (${myApplications.length})`}
                                </Button>

                            </CardBody>
                        </Card>
                    </Col>
                </Row>

            </Container>
        </div>
    );
};

export default Dashboard;
