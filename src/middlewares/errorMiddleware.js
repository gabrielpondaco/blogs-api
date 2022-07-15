const errors = {
  ValidationError: 400,
  InvalidFieldsError: 400,
  NotFoundError: 404,
  ConflictError: 409,
  TokenError: 401,
};

const errorMiddlewareHandler = ({ name, message }, _req, res, _next) => {
  const status = errors[name];
  if (!status) return res.sendStatus(500);
  res.status(status).json({ message });
};

module.exports = errorMiddlewareHandler;