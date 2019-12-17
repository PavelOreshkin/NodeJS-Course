import Joi from '@hapi/joi';

export const schema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().required(),
  age: Joi
    .number()
    .integer()
    .min(4)
    .max(130)
    .required(),
})
