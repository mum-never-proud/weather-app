import jestFetchMock from 'jest-fetch-mock';
import { fetchCurrentWeatherByCoords, fetchCurrentWeatherById, queryPlace } from '@services/weather';
import accessLocation from '@services/location';
import weatherResponse from '@mocks/api/weather.json';
import findResponse from '@mocks/api/find.json';
import 'jest-extended';

jestFetchMock.enableMocks();

describe('Service::Weather', () => {
  beforeEach(() => {
    fetch.mockResponse(() => Promise.resolve(JSON.stringify(weatherResponse)));
  });

  afterEach(() => {
    fetch.resetMocks();
  });

  it('should fetch current weather by geo coords', async () => {
    const coords = await accessLocation();

    const weather = await fetchCurrentWeatherByCoords(coords.latitude, coords.longitude);

    expect(weather).toContainKeys([
      'base', 'coord', 'weather',
      'main', 'visibility', 'wind',
      'clouds', 'dt', 'sys', 'id', 'name', 'cod', 'list',
    ]);
  });

  it('should fetch current weather for multiple cites', async () => {
    await fetchCurrentWeatherById(['1', '2']);

    expect(new RegExp(/id=1,2/gi).test(fetch.mock.calls[0][0])).toBe(true);
  });

  it('should query place', async () => {
    fetch.mockResponse(() => Promise.resolve(JSON.stringify(findResponse)));

    const coords = await accessLocation();
    const weather = await queryPlace(coords.latitude, coords.longitude);

    expect(weather).toContainKeys([
      'message', 'cod', 'count', 'list',
    ]);
  });
});
