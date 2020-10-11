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

  it('should throw error when table methods are called without valid table', async () => {
    expect.assertions(9);

    const db = await new Storage('weather_app');

    expect(() => db.insert()).toThrowError('invalid table instance');
    expect(() => db.update()).toThrowError('invalid table instance');
    expect(() => db.first()).toThrowError('invalid table instance');
    expect(() => db.last()).toThrowError('invalid table instance');
    expect(() => db.find()).toThrowError('invalid table instance');
    expect(() => db.findAll()).toThrowError('invalid table instance');
    expect(() => db.findBy()).toThrowError('invalid table instance');
    expect(() => db.deleteAll()).toThrowError('invalid table instance');
    expect(() => db.size()).toThrowError('invalid table instance');
  });
});

describe('Service::Storage Table', () => {
  let db;
  let table;

  beforeEach(async () => {
    db = await new Storage('weather_app');
    table = db.table('favourites');

    table.insert([{ name: 'Chennai' }, { name: 'Banglore' }]);
  });

  afterEach(() => {
    table.deleteAll();
  });

  it('should insert data', () => {
    expect.assertions(1);
    expect(table.insert({ name: 'Mumbai' })).toContainKeys(['id', 'name', 'createdAt', 'updatedAt']);
  });

  it('should insert array of data', () => {
    expect.assertions(1);
    expect(
      table.insert([{ name: 'Mumbai' }, { name: 'Delhi' }]).length,
    ).toEqual(2);
  });

  it('should peek first record', () => {
    expect.assertions(1);
    expect(table.first().name).toEqual('Chennai');
  });

  it('should peek last record', () => {
    expect.assertions(1);
    expect(table.last().name).toEqual('Banglore');
  });

  it('should update record', () => {
    expect.assertions(2);

    const record = table.insert({ name: 'Kolkat' });

    expect(table.last().name).toEqual('Kolkat');

    table.update({ ...record, name: 'Kolkata' });

    expect(table.last().name).toEqual('Kolkata');
  });

  it('should return size of the table', () => {
    expect.assertions(1);
    expect(table.size()).toEqual(2);
  });

  it('should find record by index', () => {
    expect.assertions(1);
    expect(table.find(0).name).toEqual('Chennai');
  });

  it('should find all the records', () => {
    expect.assertions(1);
    expect(table.findAll().length).toEqual(2);
  });

  it('should filter records', () => {
    expect.assertions(2);
    expect(table.findBy({ name: 'Chennai' }).length).toEqual(1);
    expect(table.findBy({ name: 'Chennai', id: 'blah' }).length).toEqual(0);
  });
});
