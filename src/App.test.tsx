import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

test('renders auth page by default', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  const title = screen.getByText(/Добро пожаловать!/i);
  expect(title).toBeInTheDocument();
});
