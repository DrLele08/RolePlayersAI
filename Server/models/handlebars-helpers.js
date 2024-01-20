module.exports = {
  equal: (a, b, options) => {
    if (a === b) {
      return options.fn(this);
    }

    return options.inverse(this);
  },
  neq: (a, b, options) => {
    if (a !== b) {
      return options.fn(this);
    }

    return options.inverse(this);
  },
};
