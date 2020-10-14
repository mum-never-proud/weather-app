import shortid from 'shortid';

const table = Symbol('table');

class Table {
  constructor(name, tableInstance) {
    this.name = name;
    this[table] = [...tableInstance];

    return this;
  }

  insert(data) {
    if (Array.isArray(data)) {
      return data.map((datum) => this.insert(datum));
    }

    if (data.id) {
      return this.update(data);
    }

    const record = Table.createRecord(data);

    this[table].push(record);

    return record;
  }

  update(data) {
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
    return this[table][0];
  }

  last() {
    return this[table][this[table].length - 1];
  }

  find(index) {
    return this[table][index];
  }

  findBy(constraints) {
    if (Array.isArray(constraints)) {
      return constraints.map((constraint) => this.findBy(constraint));
    }

    const fields = Object.keys(constraints);

    return this[table].filter((record) => fields.every((key) => record[key] === constraints[key]));
  }

  findAll() {
    return this[table];
  }

  delete(index) {
    delete this[table][index];

    return this;
  }

  deleteBy(constraints) {
    const fields = Object.keys(constraints);

    this[table] = this[table]
      .filter((record) => fields.every((key) => record[key] !== constraints[key]));

    return this;
  }

  deleteAll() {
    this[table].length = 0;

    return this;
  }

  size() {
    return this[table].length;
  }

  sort(customSort) {
    const defaultSort = (record1, record2) => {
      if (record1.createdAt < record2.createdAt) {
        return 1;
      }

      if (record1.createdAt > record2.createdAt) {
        return -1;
      }

      return 0;
    };

    this[table] = this[table].sort(typeof customSort === 'function' ? customSort : defaultSort);

    return this;
  }

  toString() {
    return JSON.stringify(this[table]);
  }

  static createRecord(data) {
    const record = { ...data };

    record.id = shortid.generate();
    record.createdAt = Date.now();
    record.updatedAt = null;

    return record;
  }
}

export default Table;
