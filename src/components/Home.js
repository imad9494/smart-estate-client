import React, { useState } from 'react';
import Header from './Header';
import { Container, Input, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchProperties } from '../slices/propertySlice';

const Home = () => {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSearch = () => {
        dispatch(fetchProperties(search));
        navigate('/properties');
    };

    return (
        <div className="bg-dark text-white" style={{ minHeight: '100vh', backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8))' }}>
            <Header />
            <Container className="d-flex flex-column justify-content-center align-items-center text-center" style={{ height: '80vh' }}>
                <h1 className="display-4 fw-bold mb-3">Find Your Perfect Rental Home</h1>
                <p className="lead mb-5 text-light opacity-75">Discover thousands of properties for rent. Easy, fast, and secure rental experience.</p>

                <div className="bg-white p-2 rounded-4 d-flex w-75 shadow-lg">
                    <Input
                        type="text"
                        placeholder="Search by city, neighborhood, or property type..."
                        className="border-0 shadow-none form-control-lg"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Button color="dark" className="rounded-4 px-4 fw-bold" onClick={handleSearch}>
                        Search
                    </Button>
                </div>

                <div className="mt-5 d-flex gap-3">
                    <Button color="dark" size="lg" className="px-5 border border-secondary" onClick={() => navigate('/properties')}>View Properties</Button>
                    <Button color="light" size="lg" className="px-5 text-dark fw-bold" onClick={() => navigate('/add-property')}>List Your Property</Button>
                </div>
            </Container>
        </div>
    );
};

export default Home;
