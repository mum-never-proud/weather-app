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

    const record = { ...data };

    record.id = shortid.generate();
    record.createdAt = Date.now();
    record.updatedAt = null;

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
    const fields = Object.keys(constraints);

    return this[table].filter((record) => fields.every((key) => record[key] === constraints[key]));
  }

  findAll() {
    return this[table];
  }

  deleteAll() {
    this[table].length = 0;

    return this;
  }

  size() {
    return this[table].length;
  }

  toString() {
    return JSON.stringify(this[table]);
  }
}

export default Table;
