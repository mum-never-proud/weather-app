import Storage from '@services/storage';
import Table from '@services/table';
import 'jest-extended';

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

  it('should throw error for invalid data', () => {
    expect.assertions(2);
    expect(() => table.insert()).toThrowError();
    expect(() => table.update()).toThrowError();
  });

  it('should update data if existing on insert', () => {
    expect.assertions(3);

    expect(table.size()).toEqual(2);

    const rec = table.insert({ name: 'Delh' });

    table.insert({ ...rec, name: 'Delhi' });

    expect(table.size()).toEqual(3);
    expect(table.last().name).toEqual('Delhi');
  });

  it('should insert data when id is missing in DB', () => {
    expect.assertions(3);

    expect(table.size()).toEqual(2);

    table.update({ id: 'not_in_db', name: 'Delhi' });

    expect(table.size()).toEqual(3);
    expect(table.last().name).toEqual('Delhi');
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

  it('should filter records by multiple constraints', () => {
    expect.assertions(1);
    expect(table.findBy([{ name: 'Chennai' }, { name: 'Banglore' }]).length).toEqual(2);
  });

  it('should delete record by index', () => {
    expect.assertions(2);
    expect(table.size()).toEqual(2);

    table.delete(0);

    expect(table.size()).toEqual(1);
  });

  it('should delete record by constraints', () => {
    expect.assertions(2);
    expect(table.size()).toEqual(2);

    table.deleteBy({ name: 'Chennai' });

    expect(table.size()).toEqual(1);
  });

  it('should create record', () => {
    expect.assertions(1);

    expect(Table.createRecord({ name: 'Chennai' })).toContainAllKeys(['name', 'id', 'createdAt', 'updatedAt']);
  });

  it('should return json of a table', () => {
    expect.assertions(1);
    expect(table.toString()).toBeString();
  });

  it('should sort records', () => {
    expect.assertions(1);

    table.update({ ...table.first(), createdAt: Date.now() - 3000 });

    expect(table.sort().last().name).toEqual('Chennai');
  });
});
