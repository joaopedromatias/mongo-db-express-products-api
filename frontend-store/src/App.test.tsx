import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const storeTextElement = screen.getByText(/store/i);
  expect(storeTextElement).toBeInTheDocument();
});
