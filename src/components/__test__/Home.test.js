import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Home from '../Home';

const mockStore = configureStore([]);

describe('Home Component', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            property: { // Home likely relies on property slice if it fetches properties
                properties: [],
                status: 'idle',
                error: null
            },
            user: { // Header likely uses user slice
                user: null,
                isAuthenticated: false
            }
        });
    });

    // 1. Snapshot test
    test('matches snapshot', () => {
        const { asFragment } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Home />
                </BrowserRouter>
            </Provider>
        );
        expect(asFragment()).toMatchSnapshot();
    });

  
    test('renders Smart Estate heading', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Home />
                </BrowserRouter>
            </Provider>
        );
        // "SmartEstate" is in the NavbarBrand in Header.js
        const heading = screen.getByText(/SmartEstate/i);
        expect(heading).toBeInTheDocument();
    });
});

