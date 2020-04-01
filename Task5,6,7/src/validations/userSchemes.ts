import Joi from '@hapi/joi';

export const addUserSchema: Joi.ObjectSchema<{ login: string; password: string; age: number; }> = Joi.object({
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

export const editUserSchema: Joi.ObjectSchema<{ login: string; password: string; age: number; }> = Joi.object({
    login: Joi
        .string()
        .pattern(new RegExp(/^[a-z0-9_.]+$/i)),

    password: Joi
        .string()
        .pattern(new RegExp(/\d/))
        .pattern(new RegExp(/[a-z]/i)),

    age: Joi
        .number()
        .integer()
        .min(4)
        .max(130)
});

