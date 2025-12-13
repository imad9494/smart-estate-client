import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMyApplications, fetchAllApplications, updateApplicationStatus } from '../slices/applicationSlice';
import { Container, Card, CardBody, Table, Badge, Button, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaCheck, FaTimes } from 'react-icons/fa';

const MyApplications = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user);
    const { myApplications, allApplications } = useSelector((state) => state.applications);

    // Admin Modal State
    const [selectedApp, setSelectedApp] = useState(null);
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    useEffect(() => {
        if (!user) {
            navigate('/login');
        } else if (user.userRole === 'Admin') {
            dispatch(fetchAllApplications());
        } else {
            dispatch(fetchMyApplications(user.userEmail));
        }
    }, [dispatch, user, navigate]);

    const handleViewApplication = (app) => {
        setSelectedApp(app);
        toggle();
    };

    const handleStatusUpdate = (status) => {
        if (selectedApp) {
            dispatch(updateApplicationStatus({ id: selectedApp._id, status }))
                .unwrap()
                .then(() => {
                    toggle();
                    // Refetch or rely on Redux update
                    dispatch(fetchAllApplications());
                })
                .catch(err => alert("Failed to update status: " + err));
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Approved': return 'success';
            case 'Rejected': return 'danger';
            default: return 'warning';
        }
    };

    if (!user) return null;

    const isAdmin = user.userRole === 'Admin';
    const applications = isAdmin ? allApplications : myApplications;

    // Stats for Dashboard cards (top section)
    const totalApps = applications.length;
    const pendingApps = applications.filter(a => a.status === 'Pending').length;
    const approvedApps = applications.filter(a => a.status === 'Approved').length;

    return (
        <div className="bg-light min-vh-100 pb-5">
            <Header />
            <Container className="py-5">
                <div className="mb-4">
                    <h2 className="fw-bold">My Applications</h2>
                    <p className="text-muted">{isAdmin ? "Manage all submitted rental applications" : "Track the status of your rental applications"}</p>
                </div>

                {/* Stats Row */}
                <Row className="mb-4 g-4">
                    <Col md={4}>
                        <Card className="border-0 shadow-sm rounded-4 p-3 h-100">
                            <CardBody>
                                <h2 className="fw-bold mb-1">{totalApps}</h2>
                                <p className="text-muted mb-0">Total Applications</p>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="border-0 shadow-sm rounded-4 p-3 h-100">
                            <CardBody>
                                <h2 className="fw-bold mb-1">{pendingApps}</h2>
                                <p className="text-muted mb-0">Pending Review</p>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="border-0 shadow-sm rounded-4 p-3 h-100">
                            <CardBody>
                                <h2 className="fw-bold mb-1">{approvedApps}</h2>
                                <p className="text-muted mb-0">Approved</p>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                {/* Applications Table */}
                <Card className="border-0 shadow-sm rounded-4">
                    <CardBody className="p-0">
                        <Table responsive hover className="m-0 align-middle">
                            <thead className="bg-light text-muted">
                                <tr>
                                    <th className="p-4 border-0">Property</th>
                                    {!isAdmin && <th className="p-4 border-0">Offer Price</th>}
                                    {!isAdmin && <th className="p-4 border-0">Move-in Date</th>}
                                    {isAdmin && <th className="p-4 border-0">Applicant</th>}
                                    <th className="p-4 border-0">Submitted</th>
                                    <th className="p-4 border-0">Status</th>
                                    <th className="p-4 border-0">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {applications.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="text-center p-5 text-muted">
                                            No applications found.
                                        </td>
                                    </tr>
                                ) : (
                                    applications.map((app) => (
                                        <tr key={app._id} className="border-bottom">
                                            <td className="p-4">
                                                <div className="fw-bold text-dark">{app.propertyId?.title || "Unknown Property"}</div>
                                                <small className="text-muted">{app.propertyId?.address?.city}, {app.propertyId?.address?.state}</small>
                                            </td>
                                            {!isAdmin && <td className="p-4 fw-bold">${app.offerPrice}/mo</td>}
                                            {!isAdmin && <td className="p-4">{new Date(app.moveInDate).toLocaleDateString()}</td>}
                                            {isAdmin && (
                                                <td className="p-4">
                                                    <div className="fw-bold">{app.fullName}</div>
                                                    <small className="text-muted">{app.email}</small>
                                                </td>
                                            )}
                                            <td className="p-4">{new Date(app.createdAt).toLocaleDateString()}</td>
                                            <td className="p-4">
                                                <Badge color={getStatusColor(app.status)} pill className="px-3 py-2">
                                                    {app.status}
                                                </Badge>
                                            </td>
                                            <td className="p-4">
                                                {isAdmin ? (
                                                    <Button color="light" size="sm" className="rounded-pill px-3 border" onClick={() => handleViewApplication(app)}>
                                                        <FaEye className="me-2" /> Review
                                                    </Button>
                                                ) : (
                                                    <Button color="light" size="sm" className="rounded-pill px-3 border" onClick={() => navigate(`/property/${app.propertyId?._id}`)}>
                                                        <FaEye className="me-2" /> View Property
                                                    </Button>
                                                )}

                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
            </Container>

            {/* Admin Review Modal */}
            <Modal isOpen={modal} toggle={toggle} size="lg" centered>
                <ModalHeader toggle={toggle} className="border-0 pb-0">Application Review</ModalHeader>
                <ModalBody className="p-4">
                    {selectedApp && (
                        <Row>
                            <Col md={6} className="border-end">
                                <h5 className="fw-bold mb-3">Applicant Information</h5>
                                <p className="mb-1 text-muted">Full Name</p>
                                <p className="fw-bold">{selectedApp.fullName}</p>
                                <p className="mb-1 text-muted">Email</p>
                                <p className="fw-bold">{selectedApp.email}</p>
                                <p className="mb-1 text-muted">Phone</p>
                                <p className="fw-bold">{selectedApp.phone}</p>
                            </Col>
                            <Col md={6} className="ps-md-4">
                                <h5 className="fw-bold mb-3">Application Details</h5>
                                <p className="mb-1 text-muted">Property</p>
                                <p className="fw-bold">{selectedApp.propertyId?.title}</p>
                                <p className="mb-1 text-muted">Offer Price</p>
                                <p className="fw-bold">${selectedApp.offerPrice}/month (Listed: ${selectedApp.propertyId?.rent})</p>
                                <p className="mb-1 text-muted">Desired Move-in</p>
                                <p className="fw-bold">{new Date(selectedApp.moveInDate).toLocaleDateString()}</p>
                                <p className="mb-1 text-muted">Comments</p>
                                <p className="fst-italic bg-light p-2 rounded">{selectedApp.additionalComments || "No comments"}</p>
                            </Col>
                        </Row>
                    )}
                </ModalBody>
                <ModalFooter className="border-0 pt-0 pb-4 pe-4">
                    <Button color="light" onClick={toggle} className="me-auto">Close</Button>
                    <Button color="danger" onClick={() => handleStatusUpdate('Rejected')}>
                        <FaTimes className="me-2" /> Deny
                    </Button>
                    <Button color="success" onClick={() => handleStatusUpdate('Approved')}>
                        <FaCheck className="me-2" /> Approve
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default MyApplications;
