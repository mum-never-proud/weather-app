import { render } from '@testing-library/react';
import React from 'react';
import App from '@/App';
import '@testing-library/jest-dom/extend-expect';

describe('Weather App', () => {
  it('should load app', () => {
    expect.assertions(1);

    const { getByText } = render(<App />);

    expect(getByText('Weather App')).toBeInTheDocument();
  });
});
