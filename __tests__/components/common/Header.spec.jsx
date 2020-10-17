import { BrowserRouter as Router } from 'react-router-dom';
import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import React from 'react';
import Header from '@/components/common/Header';
import jestFetchMock from 'jest-fetch-mock';
import UserProvider from '@providers/User';
import weatherResponse from '@mocks/api/weather.json';
import '@testing-library/jest-dom/extend-expect';

jestFetchMock.enableMocks();
jest.useFakeTimers();

describe('Header', () => {
  beforeEach(() => {
    fetch.mockResponse(() => Promise.resolve(JSON.stringify(weatherResponse)));
  });

  afterEach(() => {
    fetch.resetMocks();
  });

  it('should render Header', async () => {
    expect.hasAssertions();

    render(
      <UserProvider>
        <Header />
      </UserProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('header')).toBeInTheDocument();
      expect(screen.getByTestId('search-place')).toBeInTheDocument();
    });
  });

  it('should display Current Location Weather of the User', async () => {
    expect.assertions(1);

    render(
      <UserProvider>
        <Header />
      </UserProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('weather-card')).toBeInTheDocument();
    });
  });

  it('should show suggestions on typing', async () => {
    render(
      <Router>
        <UserProvider>
          <Header />
        </UserProvider>
      </Router>,
    );

    const input = screen.getByPlaceholderText(/search for locations/i);

    fireEvent.change(input, { target: { value: 'berlin' } });
    fireEvent.focus(input);

    expect(() => screen.getByTestId('search-result')).toThrowError();

    await waitFor(() => {
      expect(input.value).toEqual('berlin');
      expect(screen.getByTestId('search-result')).toBeInTheDocument();
    });
  });

  it('should display error when location access is denied by the User', async () => {
    const nativeNavigator = { ...global.navigator };
    const navigator = jest.spyOn(global, 'navigator', 'get');

    navigator.mockImplementation(() => ({
      ...nativeNavigator,
      geolocation: {
        getCurrentPosition(_, reject) {
          reject(Error('Location access denied by user'));
        },
      },
    }));

    expect.assertions(2);

    render(
      <UserProvider>
        <Header />
      </UserProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('geo-weather-error')).toBeInTheDocument();
      expect(screen.getByText(/location access denied by user/i)).toBeInTheDocument();
    });
  });
});
