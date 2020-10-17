import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import Home from '@/components/Home';
import UserProvider from '@providers/User';
import '@testing-library/jest-dom/extend-expect';

describe('Home', () => {
  it('should render Home', async () => {
    expect.hasAssertions();

    render(
      <UserProvider>
        <Home />
      </UserProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('no-favorite-cities')).toBeInTheDocument();
      expect(screen.getByTestId('no-default-cities')).toBeInTheDocument();
    });
  });
});
