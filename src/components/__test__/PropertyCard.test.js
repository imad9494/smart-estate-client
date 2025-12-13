import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import PropertyCard from '../PropertyCard';

// PropertyCard doesn't seem to use Redux directly (based on previous view), only props and Router. 
// If it used dispatch in a click handler, we might need Provider, but just rendering props usually doesn't.
// However, the prompt general rules said "Wrap components with Provider using redux-mock-store". 
// I will wrap it to be safe and consistent.

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);
const store = mockStore({});

describe('PropertyCard Component', () => {
    const mockProperty = {
        _id: '123',
        title: 'Modern Villa',
        rent: 2500,
        address: { street: '456 Beach Rd', city: 'Gold Coast' },
        bedrooms: 4,
        bathrooms: 3,
        area: 3000,
        image: 'https://example.com/villa.jpg',
        type: 'House'
    };

    // 1. Snapshot test
    test('matches snapshot', () => {
        const { asFragment } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <PropertyCard property={mockProperty} />
                </BrowserRouter>
            </Provider>
        );
        expect(asFragment()).toMatchSnapshot();
    });

    // 2. Render test: verifies title and price
    test('renders property title and rent correctly', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <PropertyCard property={mockProperty} />
                </BrowserRouter>
            </Provider>
        );

        expect(screen.getByText(/Modern Villa/i)).toBeInTheDocument();
        // Rent usually formatted with $ sign
        expect(screen.getByText(/\$2500/i)).toBeInTheDocument();
    });
});
