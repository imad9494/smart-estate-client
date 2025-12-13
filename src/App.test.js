import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './store/store';
import App from './App';
import Home from './components/Home';

// Helper to render with providers (for components needing Router)
const renderWithProviders = (component) => {
    return render(
        <Provider store={store}>
            <BrowserRouter>
                {component}
            </BrowserRouter>
        </Provider>
    );
};

test('renders smart estate home page title', () => {
    // App contains its own BrowserRouter, so we only wrap with Provider
    render(
        <Provider store={store}>
            <App />
        </Provider>
    );
    const titleElement = screen.getByText(/Find Your Perfect Rental Home/i);
    expect(titleElement).toBeInTheDocument();
});

test('renders view properties button', () => {
    renderWithProviders(<Home />);
    const buttonElement = screen.getByText(/View Properties/i);
    expect(buttonElement).toBeInTheDocument();
});

test('renders search input', () => {
    renderWithProviders(<Home />);
    // There are 2 inputs (Header and Home body), grab the main one by placeholder
    const inputs = screen.getAllByPlaceholderText(/Search by city/i);
    expect(inputs[0]).toBeInTheDocument();
});

test('renders login link when logged out', () => {
    render(
        <Provider store={store}>
            <App />
        </Provider>
    );
    // Login link is in Header, which is in App
    const loginLink = screen.getByText(/Login/i);
    expect(loginLink).toBeInTheDocument();
});
