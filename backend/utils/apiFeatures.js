class APIFeatures {
  constructor(query, queryString, popOption) {
    this.query = query;
    this.queryString = queryString;
    this.popOption = popOption;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    for (let key in queryObj) {
      let newKey = key;
      let val = queryObj[key];
      newKey = newKey.split('_');
      if (newKey.length > 1) {
        delete queryObj[key];
        key = newKey[0];
        if (newKey.length > 2) {
          for (let i = 1; i <= newKey.length - 2; i++) {
            key = `${key}.${newKey[i]}`;
          }
        }
        let teszt = val.split(',');
        teszt.length > 1 ? (val = teszt) : (val = teszt[0]);
        let v = {};
        if (queryObj[key]) {
          v = queryObj[key];
        }
        v[newKey[newKey.length - 1]] = val;
        val = v;
      }
      if (typeof val === 'string') {
        val = val.split(',');
      }
      queryObj[key] = val;
    }

    // 1b) Advenced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lte|lt|regex|and|eq|in)\b/g,
      (match) => `$${match}`
    );

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  limit() {
    if (!this.queryString.page && this.queryString.limit) {
      const limit = this.queryString.limit;
      this.query = this.query.limit(limit);
    }

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  paginate() {
    if (this.queryString.page) {
      const page = this.queryString.page * 1 || 1;
      const limit = this.queryString.limit * 1 || 8;
      const skip = (page - 1) * limit;
      this.query = this.query.skip(skip).limit(limit);
    }

    return this;
  }

  populate() {
    if (this.popOption) {
      this.query = this.query.populate(this.popOption);
    }

    return this;
  }
}

export default APIFeatures;
