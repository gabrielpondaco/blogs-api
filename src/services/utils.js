const throwNotFoundError = (message) => {
  const err = new Error(message);
  err.name = 'NotFoundError';
  throw err;
};

const throwInvalidFieldsError = (message) => {
  const err = new Error(message);
  err.name = 'InvalidFieldsError';
  throw err;
};

module.exports = {
  throwNotFoundError,
  throwInvalidFieldsError,
};  