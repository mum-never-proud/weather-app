import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import Info from '@/components/Info';
import UserProvider from '@providers/User';
import weatherResponse from '@mocks/api/weather.json';
import jestFetchMock from 'jest-fetch-mock';
import '@testing-library/jest-dom/extend-expect';

jestFetchMock.enableMocks();

describe('Info', () => {
  beforeEach(() => {
    fetch.mockResponse(() => Promise.resolve(JSON.stringify(weatherResponse)));
  });

  it('should render Info', async () => {
    expect.hasAssertions();

    render(
      <Router>
        <UserProvider>
          <Info />
        </UserProvider>
      </Router>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('info')).toBeInTheDocument();
    });
  });
});
