import jestFetchMock from 'jest-fetch-mock';
import { fetchCurrentWeather } from '@services/weather';
import weatherResponse from '@mocks/api/weather.json';
import 'jest-extended';

jestFetchMock.enableMocks();

describe('Service::Weather', () => {
  beforeEach(() => {
    fetch.mockResponse(() => Promise.resolve(JSON.stringify(weatherResponse)));
  });

  afterEach(() => {
    fetch.resetMocks();
  });

  it('should fetch current weather for the location', async () => {
    const res = await fetchCurrentWeather('chennai');
    const weather = await res.json();

    expect(weather).toContainKeys(['location', 'request', 'current']);
  });

  it('should fetch current weather for multiple locations', async () => {
    await fetchCurrentWeather(['banglore', 'chennai']);

    expect(fetch.mock.calls[0][0].split('&').pop()).toEqual('query=banglore,chennai');
  });
});
