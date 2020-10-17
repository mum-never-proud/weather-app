import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import WeatherCard from '@/components/common/WeatherCard';
import UserProvider from '@providers/User';
import report from '@mocks/api/weather.json';
import '@testing-library/jest-dom/extend-expect';

describe('WeatherCard', () => {
  it('should render WeatherCard', async () => {
    expect.hasAssertions();

    render(
      <Router>
        <UserProvider>
          <WeatherCard report={report} />
        </UserProvider>
      </Router>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('weather-card')).toBeInTheDocument();
    });
  });

  it('should not highlight favorite', async () => {
    expect.hasAssertions();

    render(
      <Router>
        <UserProvider>
          <WeatherCard report={report} />
        </UserProvider>
      </Router>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('favorite-icon').classList.contains('text-danger')).toBe(false);
    });
  });

  it('should highlight favorite', async () => {
    expect.hasAssertions();

    render(
      <Router>
        <UserProvider>
          <WeatherCard report={{ ...report, isFavorite: true }} />
        </UserProvider>
      </Router>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('favorite-icon').classList.contains('text-danger')).toBe(true);
    });
  });
});
