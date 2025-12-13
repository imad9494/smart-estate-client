import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Register from '../Register';

const mockStore = configureStore([]);

describe('Register Component', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            user: {
                registerStatus: 'idle',
                registerError: null
            }
        });
    });

    // 1. Snapshot test
    test('matches snapshot', () => {
        const { asFragment } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Register />
                </BrowserRouter>
            </Provider>
        );
        expect(asFragment()).toMatchSnapshot();
    });

    // 2. Render test: verifies "Create an Account" heading
    test('renders Create an Account heading', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Register />
                </BrowserRouter>
            </Provider>
        );
        const heading = screen.getByText(/Create an Account/i);
        expect(heading).toBeInTheDocument();
    });

    // 3. Validation test for email input
    test('validates email input format', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Register />
                </BrowserRouter>
            </Provider>
        );

        const emailInput = screen.getByTestId('email');

        // Valid email
        fireEvent.change(emailInput, { target: { value: 'newuser@example.com' } });
        expect(emailInput.value).toBe('newuser@example.com');
        expect(emailInput.checkValidity()).toBe(true);

        // Invalid email
        fireEvent.change(emailInput, { target: { value: 'not-an-email' } });
        expect(emailInput.validity.valid).toBe(false);
    });
});
