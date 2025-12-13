import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Login from '../Login';
import userReducer from '../../slices/userSlice';

const mockStore = configureStore([]);

describe('Login Component', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            user: {
                user: null,
                msg: null,
                loading: false,
                status: 'idle',
                error: null
            }
        });
    });

    // 1. Snapshot test
    test('matches snapshot', () => {
        const { asFragment } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <Login />
                </BrowserRouter>
            </Provider>
        );
        expect(asFragment()).toMatchSnapshot();
    });

    // 2. Reducer test: verifying initial state
    test('should return the initial state', () => {
        expect(userReducer(undefined, {})).toEqual({
            user: null,
            isAuthenticated: false,
            status: "idle",
            error: null,
            registerStatus: "idle",
            registerError: null
        });
    });

    // 3. Validation test for email input
    test('validates email input format', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Login />
                </BrowserRouter>
            </Provider>
        );

        const emailInput = screen.getByTestId('x');
        // Valid email
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        expect(emailInput.value).toBe('test@example.com');
        expect(emailInput.checkValidity()).toBe(true);

        // Invalid email (HTML5 validation)
        fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
        expect(emailInput.value).toBe('invalid-email');
        expect(emailInput.validity.valid).toBe(false);
    });
});
