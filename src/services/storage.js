import shortid from 'shortid';

const database = Symbol('database');
const table = Symbol('table');
const assertTable = Symbol('assertTable');

class Storage {
  constructor(databaseName) {
    this[assertTable] = () => {
      if (!Array.isArray(this[table])) {
        throw new Error('invalid table instance');
      }
    };

    return new Promise((resolve, reject) => {
      if (!window.localStorage) {
        return reject(Error('localStorage is not supported'));
      }

      if (!databaseName) {
        return reject(Error('databaseName is required'));
      }

      const { localStorage } = window;
      const rawDatabase = localStorage.getItem(databaseName);

      this.databaseName = databaseName;
      this[database] = rawDatabase ? JSON.parse(rawDatabase) : {};

      return resolve(this);
    });
  }

  table(tableName) {
    if (!tableName) {
      throw new Error('tableName is required');
    }

    this.tableName = tableName;
    this[table] = this[database][tableName] || [];

    return this;
  }

  insert(data) {
    this[assertTable]();

    if (Array.isArray(data)) {
      return data.map((datum) => this.insert(datum));
    }

    if (data.id) {
      return this.update(data);
    }

    const record = { ...data };

    record.id = shortid.generate();
    record.createdAt = Date.now();
    record.updatedAt = null;

    this[table].push(record);

    return record;
  }

  update(data) {
    this[assertTable]();

    if (!data.id) {
      return this.insert(data);
    }

    const updatedRecord = { ...data };
    const recordIndex = this[table].findIndex((record) => record.id === updatedRecord.id);

    if (recordIndex === -1) {
      return this.insert(updatedRecord);
    }

    updatedRecord.updatedAt = Date.now();

    this[table][recordIndex] = updatedRecord;

    return updatedRecord;
  }

  first() {
    this[assertTable]();

    return this[table][0];
  }

  last() {
    this[assertTable]();

    return this[table][this[table].length - 1];
  }

  find(index) {
    this[assertTable]();

    return this[table][index];
  }

  findBy(constraints) {
    this[assertTable]();

    const fields = Object.keys(constraints);

    return this[table].filter((record) => fields.every((key) => record[key] === constraints[key]));
  }

  findAll() {
    this[assertTable]();

    return this[table];
  }

  deleteAll() {
    this[assertTable]();

    this[table].length = 0;

    return this;
  }

  size() {
    this[assertTable]();

    return this[table].length;
  }
}

export default Storage;
