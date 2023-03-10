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

const throwConflictError = (message) => {
  const err = new Error(message);
  err.name = 'ConflictError';
  throw err;
};

const throwTokenError = (message) => {
  const err = new Error(message);
  err.name = 'TokenError';
  throw err;
};

module.exports = {
  throwNotFoundError,
  throwInvalidFieldsError,
  throwConflictError,
  throwTokenError,
};  