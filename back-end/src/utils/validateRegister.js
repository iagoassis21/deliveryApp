const Joi = require('joi');

const validateRegister = (params) => {
  const schema = Joi.object({
    name: Joi.string().min(12).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  const { value, error } = schema.validate(params);

  if (error) {
    throw new Error('Conflict');
  }

  return value;
};

module.exports = validateRegister;