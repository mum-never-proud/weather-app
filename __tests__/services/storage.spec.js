import Storage from '@services/storage';
import 'jest-extended';

describe('Service::Storage', () => {
  it('should throw error when localStorage is not supported', async () => {
    expect.assertions(1);

    const { localStorage } = window;

    Object.defineProperty(window, 'localStorage', { value: undefined, writable: true });

    await expect(new Storage()).rejects.toThrowError('localStorage is not supported');

    Object.defineProperty(window, 'localStorage', { value: localStorage, writable: true });
  });

  it('should throw error when databaseName is not specified', async () => {
    expect.assertions(1);

    await expect(new Storage()).rejects.toThrowError('databaseName is required');
  });

  it('show throw error when tableName is not specified', async () => {
    expect.assertions(1);

    const db = await new Storage('weather_app');

    expect(() => db.table()).toThrowError('tableName is required');
  });
});
