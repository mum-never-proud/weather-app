import { render, waitFor } from '@testing-library/react';
import React from 'react';
import App from '@/App';
import UserProvider from '@providers/User';
import '@testing-library/jest-dom/extend-expect';

describe('Weather App', () => {
  it('should render app', async () => {
    expect.hasAssertions();

    const { getByTestId } = render(
      <UserProvider>
        <App />
      </UserProvider>,
    );

    await waitFor(() => {
      expect(getByTestId('container')).toBeInTheDocument();
      expect(getByTestId('header')).toBeInTheDocument();
    });
  });
});
