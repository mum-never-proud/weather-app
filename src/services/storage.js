import Table from '@services/table';

const database = Symbol('database');

class Storage {
  constructor(databaseName) {
    return new Promise((resolve, reject) => {
      if (!window.localStorage) {
        return reject(Error('localStorage is not supported'));
      }

      if (!databaseName) {
        return reject(Error('databaseName is required'));
      }

      const rawDatabase = window.localStorage.getItem(databaseName);

      this.databaseName = databaseName;
      this[database] = rawDatabase ? JSON.parse(rawDatabase) : {};

      return resolve(this);
    });
  }

  commit(table) {
    return new Promise((resolve, reject) => {
      try {
        this[database] = { ...this[database], [table.name]: table.findAll() };

        window.localStorage.setItem(this.databaseName, JSON.stringify(this[database]));

        resolve(this);
      } catch (ex) {
        reject(Error(ex));
      }
    });
  }

  table(tableName) {
    if (!tableName) {
      throw new Error('tableName is required');
    }

    return new Table(tableName, this[database][tableName] || []);
  }
}

export default Storage;
