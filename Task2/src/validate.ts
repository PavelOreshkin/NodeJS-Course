import Joi from '@hapi/joi';

export const schema = Joi.object({
    login: Joi
        .string()
        .pattern(new RegExp(/^[a-z0-9_.]+$/i))
        .required(),

    password: Joi
        .string()
        .pattern(new RegExp(/\d/))
        .pattern(new RegExp(/[a-z]/i))
        .required(),

    age: Joi
        .number()
        .integer()
        .min(4)
        .max(130)
        .required()
});
